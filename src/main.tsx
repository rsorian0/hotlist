import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/legacy.css'

const isDev = import.meta.env.MODE === 'development'
const Router = isDev ? HashRouter : BrowserRouter
const base   = isDev ? undefined : import.meta.env.BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={base}>
      <App />
    </Router>
  </React.StrictMode>
)