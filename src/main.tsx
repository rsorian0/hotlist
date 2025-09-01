// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// carrega o visual original do projeto
import './styles/legacy.css'

// basename usa a mesma base do Vite (ok p/ localhost e GitHub Pages)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
)