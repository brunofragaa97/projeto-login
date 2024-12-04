import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaLogin from "./TelaLogin";
import DashBoard from "./DashBoard";

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
