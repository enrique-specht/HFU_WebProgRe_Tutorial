import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
