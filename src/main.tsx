import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

if ('serviceWorker' in navigator) {
  // Recarrega assim que o novo SW assume o controle
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload()
  })

  navigator.serviceWorker.ready.then((reg) => {
    // Verifica atualização imediatamente ao carregar
    reg.update()

    // Verifica também ao voltar ao primeiro plano
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
