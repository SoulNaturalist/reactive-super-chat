import Alert from '@mui/material/Alert';
import { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
//import useTransition from '../hooks/useTranslate';
import InputEmoji from 'react-input-emoji';
import {isMobile} from 'react-device-detect';
import useTitle from '../hooks/useTitle';
import React from 'react';

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [countData, setCount] = useState("");
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ id: number, nickname: string; message: string }[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:5000");
    socket.on("connect", () => {
      const audio = new Audio('audio/alert.mp3');
      audio.play();
      console.log("Connected")
    });
  
    socket.emit("request_data", { nickname: localStorage.getItem("nickname") });
    socket.on("request_data", (data) => {
      setCount(data.count);
    });
  
    socket.on("new_message", (data) => {
      console.log("added message");
      setMessages(data);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected");
      socket.disconnect();
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  const addMessage = (nickname: string, message: string) => {
      setMessages(prevMessages => [...prevMessages, { id: nextId.current++, nickname, message }]);
  };
  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  // const textProps = { text: "Пример текста для перевода" };
  // const text = await useTransition(textProps);

  const settingThemeChat = () => {
    const themeChat = localStorage.getItem("theme");
    if (themeChat) {
      if (themeChat === "theme_card_dark") {
        return {'backgroundColor': '#000000','backgroundColor2': '#050505'}

      } else if (themeChat === "theme_card_light") {
        return {'backgroundColor': '#ffffff','backgroundColor2': '#e6e6e6'}

      } else {
        return {'backgroundColor': '#35487a','backgroundColor2': '#2f406d'}
      }
    }
    return {'backgroundColor': '#35487a','backgroundColor2': '#2f406d'}
  }

  const handleSubmit = () => {
    const socket = socketIOClient("http://127.0.0.1:5000");
    const nickname = localStorage.getItem("nickname") || '{}';
    addMessage(nickname, inputValue)
    socket.emit("new_message", {nickname: nickname, message: inputValue});
    setInputValue("")
  };
  const messagesComponent = messages.slice(isMobile ? -15:-18).map((message, index) => {
    return (
      <div key={index} className="message_card" style={index % 2 === 0 && index !== 0 ? 
      {'backgroundColor': settingThemeChat()['backgroundColor']}:{'backgroundColor': settingThemeChat()['backgroundColor2']}} ref={scrollDivRef}>
        <p className="message_paragraph" style={settingThemeChat()['backgroundColor'] === '#ffffff' ? {"color":"black"}:{}}>{message.nickname}: {message.message}</p>
      </div>
    );
  });

  const chatComponent = () => {
    if (!localStorage.hasOwnProperty('nickname') || localStorage.length === 0) {
      return (
        <div>
          <input className="input_chat" type="text" placeholder="Сообщение" disabled/>
          <p className="users_paragraph">Пользователей на сайте - {countData}</p>
        </div>
      );
    } else {
      return <div>
        <br/>
        <div className='emoji-wrapper'>
          <InputEmoji
            value={inputValue}
            onChange={setInputValue}
            onEnter={(text: string) => setInputValue(text)}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение" shouldReturn={false} shouldConvertEmojiToImage={false}          />
        </div>
        <p className="users_paragraph">Пользователей на сайте - {countData}</p>
      </div>
        


    }
  };
  const checkNameEmpty = () => {
    if (!localStorage.hasOwnProperty('nickname') || localStorage.length === 0) {
      return <Alert variant="outlined" severity="error">Вы не ввели никнейм!</Alert>
    }

  }
  return <div>
    <div>
      {messagesComponent}
    </div>
    {checkNameEmpty()}
    {chatComponent()}
  </div>
}