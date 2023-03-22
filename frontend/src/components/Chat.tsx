import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";


export default function Chat() {
  const [inputValue, setInputValue] = useState("Сообщение");
  const [countData, setCount] = useState("");

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:5000");
    socket.on("connect", () => console.log("Connected"));
    socket.emit("request_data", {nickname:localStorage.getItem("nickname")});
    socket.on("request_data", (data) => { 
      setCount(data.count);
    });
    socket.on('disconnect', () => {
      console.log("Disconnected");
      socket.disconnect();
      
    });
  });

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    console.log('Form submitted:', inputValue);
  };
  const chatComponent = () => {
    return <div>
      <input className="input_chat" type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleKeyDown}/>
      <p className="users_paragraph">Пользователей на сайте - {countData}</p>
    </div>
  }
  return chatComponent()
}
