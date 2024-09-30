import LoginForm from "./pages/LoginForm";
import Chat from "./pages/Chat";
import ChoiceTheme from "./pages/ChoiceTheme";
import User from "./pages/User";
import "./App.css";
import { Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

function App() {
  return <HelmetProvider>
    <Route path="/" component={LoginForm} />
    <Route path="/chat" component={Chat} />
    <Route path="/theme" component={ChoiceTheme} />
    <Route path="/profile/:userName"/>
  </HelmetProvider>
}


export default App;
