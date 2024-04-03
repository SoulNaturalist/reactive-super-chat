import LoginForm from "./pages/LoginForm";
import Chat from "./pages/Chat";
import ChoiceTheme from "./pages/ChoiceTheme";
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
