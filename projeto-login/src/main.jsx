import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaLogin from './TelaLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelaLogin />
  </StrictMode>,
)
