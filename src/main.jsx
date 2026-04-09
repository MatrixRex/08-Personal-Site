import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let isAuthenticated = true;

if (import.meta.env.VITE_IS_STAGING === 'true') {
  const password = prompt('Please enter the staging password:');
  if (password !== 'rex ') {
    isAuthenticated = false;
    document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#fff;font-family:sans-serif;"><h1>Access Denied</h1></div>';
  }
}

if (isAuthenticated) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
