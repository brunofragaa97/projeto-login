import { useEffect, useState } from 'react'

import './Styles/desktop/TelaLogin.css'
import './Styles/mobile/TelaLogin.css'
import { useNavigate } from "react-router-dom";


function TelaLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("")

  const navigate = useNavigate();


  const loginClick = async (event) => {
    event.preventDefault();
    if (password.length < 6) { 
      return setErrorLogin("Senha não pode conter menos que 6 caracteres"); 
    } else { 
      try { 
        const response = await fetch('http://localhost:5000/api/login', { 
          method: 'POST', //
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ username, password }), 
        });

        const servidor = await response.json();
        if (response.ok) {
          console.log(` ${servidor.message} / ${servidor.user} / ${servidor.token} /`);
          setErrorLogin(servidor.message)
          localStorage.setItem('authToken', servidor.token);
          localStorage.setItem('usuarioLogado', username);
          navigate(`/dashboard-principal`)
        


        } else {
          console.log(`Erro ao logar!!! Mensagem do servidor: ${servidor.message}`)
          setErrorLogin(servidor.message)
        }
      } catch (error) {
        console.log("Erro ao conectar no servidor")
        setErrorLogin("Servidor indisponivel")
      }
    }
  }


  return (
    <>
      <div className='main-container'>
        <div className='animation-gif'>
          <div className='container-login'>
            <div className='container-login-caixa'>
              <div><h1>LOGUE-SE</h1></div>
              <form onSubmit={loginClick}>
                <div>
                  <label htmlFor="username">Usuario</label>
                  <input
                    type='text'
                    value={username}
                    id="username"
                    name='username'
                    onChange={(e) => setUsername(e.target.value)} required></input>
                </div>
                <div>
                  <label htmlFor="userpassword">Senha</label>
                  <input
                    type='password'
                    value={password}
                    id='userpassword'
                    name='userpassword'
                    onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div>
                  <button type="submit" id='button-login'>ENTRAR</button>
                </div>
              </form>
              <div>
                <p className='error-message'>{errorLogin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default TelaLogin
