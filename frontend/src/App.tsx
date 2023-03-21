import LoginForm from "./components/LoginForm";
import Chat from "./components/Chat";
import "./App.css";
import { Route } from "wouter";


function App() {
  return <div>
    <Route path="/" component={LoginForm} />
    <Route path="/chat" component={Chat} />
  </div>
}


export default App;
