import { useState } from 'react'

import './telaLogin.css'

function TelaLogin() {
  const [count, setCount] = useState(0)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const servidor = await response.json();
      if (response.ok) {
        console.log(` ${servidor.message} / ${servidor.user} / ${servidor.token} /`);
      } else {
        console.log(`Erro ao logar!!! Mensagem do servidor: ${servidor.message}`)
      }
    } catch (error) {
      console.log("Erro ao conectar no servidor")
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
                  <label for="username">Usuario</label>
                  <input 
                  type='text' 
                  value={username} 
                  id="username" 
                  name='username' 
                  onChange={(e) => setUsername(e.target.value)}required></input>
                </div>
                <div>
                  <label for="userpassword">Senha</label>
                  <input
                    type='password'
                    value={password}
                    id='userpassword'
                    name='userpassword'
                    onChange={(e) => setPassword(e.target.value)}required></input>
                </div>
                <div>
                  <button type="submit" id='button-login'>ENTRAR</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TelaLogin
