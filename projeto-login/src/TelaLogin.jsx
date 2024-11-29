import { useEffect, useState } from 'react'

import './Styles/desktop/TelaLogin.css'
import './Styles/mobile/TelaLogin.css'
import { useNavigate } from "react-router-dom";


function TelaLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("")

  const navigate = useNavigate();


  const loginClick = async (event) => { // Declara uma função assíncrona (função seta - arrow function). É usada porque ela lida com operações assíncronas (como chamadas à API) com `await`.
    event.preventDefault(); // Evita o comportamento padrão do evento, que no caso de formulários seria recarregar a página ao enviar.

    if (password.length < 6) { // Verifica se o comprimento da senha é menor que 6 caracteres.
      return setErrorLogin("Senha não pode conter menos que 6 caracteres"); // Define uma mensagem de erro usando a função `setErrorLogin`. O `return` interrompe a execução da função.
    } else { // Caso a senha tenha 6 ou mais caracteres, segue com a tentativa de login.
      try { // Inicia um bloco `try`, que tenta executar o código e permite capturar erros no bloco `catch`.
        const response = await fetch('http://localhost:5000/api/login', { // Faz uma requisição HTTP para a API usando `fetch`, que retorna uma promessa. `await` espera a resposta ser resolvida.
          method: 'POST', // Define o método HTTP da requisição como POST, usado para enviar dados ao servidor.
          headers: { 'Content-Type': 'application/json' }, // Adiciona cabeçalhos HTTP, indicando que o corpo da requisição será JSON.
          body: JSON.stringify({ username, password }), // Converte um objeto JavaScript com `username` e `password` para uma string JSON, que será enviada no corpo da requisição.
        });

        const servidor = await response.json();
        if (response.ok) {
          console.log(` ${servidor.message} / ${servidor.user} / ${servidor.token} /`);
          setErrorLogin(servidor.message)
          localStorage.setItem('authToken', servidor.token);
          localStorage.setItem('usuarioLogado', username);
          navigate(`/dashboard-principal?loginauth-${servidor.token}`);
        


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
