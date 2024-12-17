import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../Styles/index.css'
import Rotas from "./Rotas/Rotas";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas />
  </StrictMode>,
)
