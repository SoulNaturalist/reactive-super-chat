import Alert from '@mui/material/Alert';
import { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
const soundAlert = require("../sounds/alert.mp3");
// declaring an mp3 file did not help, I solve the problem as best I can :)


export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [countData, setCount] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ id: number, nickname: string; message: string }[]>([]);
  const nextId = useRef(1);
  const [scrollStop, setScrollStop] = useState(false);


  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:5000");
    socket.on("connect", () => {
      const audio = new Audio(soundAlert);
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

  const handleSubmit = () => {
    const socket = socketIOClient("http://127.0.0.1:5000");
    const nickname = localStorage.getItem("nickname") || '{}';
    addMessage(nickname, inputValue)
    socket.emit("new_message", {nickname: nickname, message: inputValue});
    setInputValue("");
  };

  
  const handleScroll = () => {
    if (!scrollStop) {
      const pixelsInput = document.getElementsByClassName("message_card")[document.getElementsByClassName("message_card").length - 1].getBoundingClientRect().y - 
      (document.getElementsByClassName("message_card")[document.getElementsByClassName("message_card").length - 1].getBoundingClientRect().y * 90) / 100
      setScrollPosition(pixelsInput);
      setScrollStop(true);
    }
  };

  const messagesComponent = messages.map((message, index) => {
    return (
      <div key={message.id} className="message_card" style={index % 2 === 0 && index !== 0 ? {'backgroundColor': '#35487a'}:{'backgroundColor': '#2f406d'}} 
      ref={scrollDivRef}>
        <p className="message_paragraph">{message.nickname}: {message.message}</p>
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
      return (
        <div>
          <input className="input_chat" type="text" placeholder="Сообщение" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleKeyDown} 
          style={scrollPosition !== 0 ? {'position':'relative', 'top':scrollPosition, 'margin':'revert'}:{}}/>
          <p className="users_paragraph">Пользователей на сайте - {countData}</p>
        </div>
      );

    }
  };
  const checkNameEmpty = () => {
    if (!localStorage.hasOwnProperty('nickname') || localStorage.length === 0) {
      return <Alert variant="outlined" severity="error">Вы не ввели никнейм!</Alert>
    }

  }
  return <div>
    <div onWheel={handleScroll}>
      {messagesComponent}
    </div>
    {checkNameEmpty()}
    {chatComponent()}
  </div>
}