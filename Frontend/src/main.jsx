import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import Store from './Store/index.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode className="bg-slate-900">
    <Router>
      <Provider store={Store}>
        <App />
        <ToastContainer/>
      </Provider>
     
    </Router>
   
  </StrictMode>,
)
