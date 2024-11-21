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
          <div>
            LOGIN:
            <div>
              <input></input>
            </div>
            <div>
              SENHA:
            </div>
            <div>
              <input typeof='password'></input>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
