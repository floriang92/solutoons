import './App.css';
import CheckConnection from '../src/Components/CheckConnection/CheckConnection'
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Dashboard from '../src/Pages/Dashboard'
function App() {
  return (
    <div className="App">
      <CheckConnection></CheckConnection>
    </div>
  );
}

export default App;


