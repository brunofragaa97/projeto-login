import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Styles/desktop/dashboard.css'
import './Styles/mobile/dashboard.css'

function DashBoard() {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem('usuarioLogado'))  
  const [userName, setUserName] = useState("")
  const token = localStorage.getItem("authToken")
  const usuarioErrado = "bruno"
 

  useEffect(() => {
    const serverConection = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/validar-usuario?username=${usuarioLogado}`, {
            method: 'GET'
          });
          
          const servidor = await response.json();
          if (!response.ok) {
            console.log("Erro do servidor:", servidor.message);
            console.log("CAIU NO IF");
            navigate('/'); 
          } else {
            console.log(`${servidor.message}  /   ${usuarioLogado} / Seu token é  = ${token}`);
            console.log("caiu no else, sucesso!");
          }



        } catch (error) {
          console.log("Servidor indisponivel, Caiu no catch")
          navigate('/')
        }
    };
    serverConection()
  }, [])

  



  return (
    <div>
      <div className="main-container">
        <div className="span1-container">Seja bem vindo, de volta Sr: {userName}</div>

        <div className="span2-container"><span>O que você deseja fazer hoje?</span>
        </div>
      </div>
    </div >
  )
}



export default DashBoard;