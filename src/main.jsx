import { StrictMode, Component } from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { createRoot } from "react-dom/client"
import '/i18next.js';


createRoot(document.getElementById("root")).render(
  <BrowserRouter>

      <App />

  </BrowserRouter>
)
