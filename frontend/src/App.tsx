import LoginForm from "./components/LoginForm";
import Chat from "./components/Chat";
import ChoiceTheme from "./components/ChoiceTheme";
import "./App.css";
import { Route } from "wouter";


function App() {
  return <div>
    <Route path="/" component={LoginForm} />
    <Route path="/chat" component={Chat} />
    <Route path="/theme" component={ChoiceTheme} />
  </div>
}


export default App;
