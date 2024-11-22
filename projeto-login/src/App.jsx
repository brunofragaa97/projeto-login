import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main-container'>
        <div className='animation-gif'>
          <div className='container-login'>
            <div className='container-login-caixa'>
              <div><h1>LOGUE-SE</h1></div>
              <form method='POST'>
                <div>
                  <label>Usuario</label>
                  <input type='text' name='username' placeholder=''></input>
                </div>
                <div>
                  <label>Senha</label>
                  <input type='password' name='userpassword'></input>
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

export default App
