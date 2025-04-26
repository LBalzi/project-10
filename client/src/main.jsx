import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import './global.css'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
