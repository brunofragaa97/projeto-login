import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Styles/desktop/dashbord.css'

function DashBoard() {
  const navigate = useNavigate();
  const usuarioLogado = localStorage.getItem('usuarioLogado')
  const [username, setUsername] = useState(usuarioLogado)

  useEffect(() => {
    const testandoServidor = async () => {
      if (!username) {
        console.log("nome de usuario não definido")
      } else {
        console.log (`enviando corretamento o user '${username}' ao servidor`)
        try {
          const response = await fetch(`http://localhost:5000/api/validar-usuario?username=${username}`, {
            method: 'GET',

          });

          const servidor = await response.json();
          if (response.ok) {
            console.log(servidor.message)
          }



        } catch {
          console.log("Erro ao conectar no servidor ERRO CAIU NO CATCH")
          navigate('/')
        }
      }
    };
    testandoServidor()
  }, [])




  return (
    <div>
      <div className="main-container-dashboard">
        <div className="span1-container">Seja bem vindo Bruno</div>

        <div className="span2-container">O que você deseja fazer hoje?
        </div>
        <div className="main-container-opcoes"></div>
      </div>
    </div >
  )
}



export default DashBoard;