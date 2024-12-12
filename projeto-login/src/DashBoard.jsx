import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Styles/desktop/dashboard.css'
import './Styles/mobile/dashboard.css'

function DashBoard() {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem('usuarioLogado'))  
  const [userName, setUserName] = useState("")
  const token = localStorage.getItem("authToken")
 

  useEffect(() => {
    const serverConection = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/validar-usuario?username=${usuarioLogado}`, {
            method: 'GET',

          });
          console.log(token)
          const servidor = await response.json();
          if(response.ok && !token){
            console.log ("token ainda validado", token)
            navigate('/')
          }
          if (response.ok) {
            console.log(servidor.message ," / " , {usuarioLogado})
            setUserName(servidor.primeiroNome)
            console.log(userName)
          }



        } catch {
          console.log("Erro ao conectar no servidor ERRO CAIU NO CATCH")
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