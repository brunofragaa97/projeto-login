import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaLogin from './TelaLogin.jsx'
import Rotas from "./Rotas";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
