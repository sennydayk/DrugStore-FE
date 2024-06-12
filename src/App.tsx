import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Mainpage from "./pages/Mainpage/Mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categorypage from "./pages/Categorypage/Categorypage";
import { Detailpage } from "./pages/Detailpage/Detailpage";

const App: React.FC = () => {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
      <Route path="/" element={<Mainpage/>} />
      <Route path="main/category/:categoryId" element={<Categorypage/>} />
      <Route path="/detail/:productid" element={<Detailpage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
