import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "./Modal"
import "../../../Styles/Login-Dashboard/Dashboard/Desktop/dashboard.css";
import "../../../Styles/Login-Dashboard/Dashboard/Mobile/dashboard.css";
import ApiFilmes from "./ApiFilmes";

function DashBoard() {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState(
    localStorage.getItem("usuarioLogado")
  );
  const [nomeUsuario, setNomeUsuario] = useState("");
  const token = localStorage.getItem("authToken");
  const [activeModalContent, setActiveModalContent] = useState(null)

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

  //-------------------MODAL--------------------------
  const openModal = (index) => {
    setActiveModalContent(index);
  };
  const closeModal = () => {
    setActiveModalContent(null);
  };

  return (
    <div className="main-container">
      <div className="main-container">
        <div className="top-bar">O que deseja fazer Hoje {nomeUsuario}?</div>
        <div className="grid-container">
        <div className="grid-item">
          
          <img 
            src="src/assets/apiimg.jpg" 
            onClick={() => openModal(1)}>
          </img>
          <Modal isOpen={activeModalContent === 1} onClose={closeModal}>
            <h1> Este conteudo vai dentro do modal </h1>
            <p>Esse é o conteúdo 001 dentro do modal.</p>
          </Modal>
            
        </div>
        <div className="grid-item">
          
            <img 
              src="src/assets/apiimg.jpg"
              onClick={() => openModal(2)}>
            </img>
            <Modal isOpen={activeModalContent === 2} onClose={closeModal}>
              <h1> Este conteudo vai dentro do modal</h1>
              <p>Esse é o conteúdo 002 dentro do modal.</p>
            </Modal>
              
          </div>
          <div className="grid-item">
          
            <img 
              src="src/assets/apiimg.jpg"
              onClick={() => openModal(3)}>
            </img>
            <Modal isOpen={activeModalContent === 3} onClose={closeModal}>
              <div>
                <ApiFilmes />
              </div>
            </Modal>
              
          </div>
          <div className="grid-item">
          
            <img 
              src="src/assets/apiimg.jpg" 
              onClick={() => openModal(4)}>
            </img>
            <Modal isOpen={activeModalContent === 4} onClose={closeModal}>
              <h1> Este conteudo vai dentro do modal</h1>
              <p>Esse é o conteúdo 004 dentro do modal.</p>
            </Modal>
              
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashBoard;
