import LoginForm from "./components/LoginForm";
import Chat from "./components/Chat";
import { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import "./App.css";
import { Route } from "wouter";


function App() {
  return <div>
    <Route path="/" component={LoginForm} />
    <Route path="/chat" component={Chat} />
  </div>
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient("http://127.0.0.1:5000");
  //   socket.on("connect", () => console.log("Connected"));
  //   socket.emit("hello", { a: "b", c: [] });
  //   socket.on("custom_event", (data) => {
  //     console.log(data);
  //     setResponse(data.message);
  //   });
  // }, []);

  // return <div>{response}</div>
}


export default App;
