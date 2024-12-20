import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "./Modal"
import "../../../Styles/Login-Dashboard/Dashboard/Desktop/dashboard.css";
import "../../../Styles/Login-Dashboard/Dashboard/Mobile/dashboard.css";

function DashBoard() {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState(
    localStorage.getItem("usuarioLogado")
  );
  const [nomeUsuario, setNomeUsuario] = useState("");
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //        CONEXÃO COM O SERVIDOR
  useEffect(() => {
    const serverConection = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/validar-usuario?username=${usuarioLogado}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const servidor = await response.json();
        if (!response.ok) {
          console.log("Erro do servidor:", servidor.message);
          console.log("CAIU NO IF");
          navigate("/");
        } else {
          console.log(
            `${servidor.message}/${servidor.primeiroNome} / caiu no Else`
          );
          setNomeUsuario(servidor.primeiroNome);
        }
      } catch (error) {
        console.log("Servidor indisponivel, Caiu no catch");
        navigate("/");
      }
    };
    serverConection();
  }, []);

  //             MODAL
  const openModal = () => {
    setIsModalOpen(true);
    console.log("modal Aberto")
    
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-container">
      <div className="main-container">
        <div className="top-bar">O que deseja fazer Hoje {nomeUsuario}?</div>
        <div className="grid-container">
          <div className="grid-item">
          
            <img 
              src="src/assets/imgteste1.png" 
              onClick={openModal}>
            </img>
            <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
              
          </div>
          <div className="grid-item">teste</div>
          <div className="grid-item">teste</div>
          <div className="grid-item">teste</div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
