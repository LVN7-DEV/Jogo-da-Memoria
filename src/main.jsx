import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { MusicProvider } from './contexts/MusicContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MusicProvider>
      <App />
    </MusicProvider>
  </React.StrictMode>
)