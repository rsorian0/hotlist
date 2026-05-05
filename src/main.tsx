import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

if ('serviceWorker' in navigator) {
  // Recarrega assim que o novo SW assume o controle
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload()
  })

  // Verifica atualização ao trazer o app para o primeiro plano
  // (no mobile o app fica em background por horas sem recarregar)
  navigator.serviceWorker.ready.then((reg) => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reg.update()
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
