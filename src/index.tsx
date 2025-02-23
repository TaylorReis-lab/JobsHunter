import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './containers/home/home'
import Globalstyles from './styles/globalstyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <>
    <Home />
    <Globalstyles />
  </>,
)