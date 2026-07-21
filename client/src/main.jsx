import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// The build prerenders each route into dist/<route>/index.html so that crawlers
// (and link-preview bots, which never run JS) get real markup. That HTML is a
// static snapshot, not a hydration target — createRoot discards it and renders
// fresh, which keeps the intro animation and framer-motion free of hydration
// mismatch rules.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
