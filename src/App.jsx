import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Users from "./views/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex">
          <div className="col-auto"></div>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
