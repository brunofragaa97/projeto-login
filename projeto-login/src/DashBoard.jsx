import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Styles/desktop/dashboard.css";
import "./Styles/mobile/dashboard.css";

function DashBoard() {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState(
    localStorage.getItem("usuarioLogado")
  );
  const [nomeUsuario, setNomeUsuario] = useState("LELEL");
  const token = localStorage.getItem("authToken")
  const usuarioErrado = "bruno";

  useEffect(() => {
    const serverConection = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/validar-usuario?username=${usuarioLogado}`,
          {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
          }
        );

        const servidor = await response.json();
        if (!response.ok) {
          console.log("Erro do servidor:", servidor.message);
          console.log("CAIU NO IF");
          navigate("/");
        } else {
          console.log(`${servidor.message}/${servidor.primeiroNome} / caiu no Else`);
          setNomeUsuario(servidor.primeiroNome)
        }
      } catch (error) {
        console.log("Servidor indisponivel, Caiu no catch");
        navigate("/");
      }
    };
    serverConection();
  }, []);

  return (
    <div>
      <div className="main-container">
        <div className="span1-container">
          Seja bem vindo, de volta Sr: {nomeUsuario}
        </div>

        <div className="span2-container">
          <span>O que você deseja fazer hoje?</span>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
