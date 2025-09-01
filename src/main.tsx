// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// importa o estilo legado (fundamental p/ visual ficar igual)
import './styles/legacy.css'

// Em React 18, StrictMode executa useEffect duas vezes no dev,
// o que pode duplicar listeners da runtime. Mantemos sem StrictMode.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)