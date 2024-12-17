import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaLogin from "../Login/TelaLogin";
import DashBoard from "../Login/DashBoard/DashBoard";

function Rotas() {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/dashboard-principal" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
