import React from 'react'
import ReactDOM from 'react-dom/client'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.css';
import App from './app/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
