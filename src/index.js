import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'

import './libs/base.css'
import './utils/rem2px'
import App from './pages/app'

ReactDOM.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)