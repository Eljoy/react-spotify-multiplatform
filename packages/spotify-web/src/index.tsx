import React from 'react'
import ReactDOM from 'react-dom'
import 'reflect-metadata'
import App from './App'
import './index.css'
import './inversify.config'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
