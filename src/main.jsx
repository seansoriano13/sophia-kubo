import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
import '@fontsource/reenie-beanie/400.css'
import '@fontsource/mrs-saint-delafield/400.css'
import './styles.css'
import App from './App.jsx'

// The Cover's scroll-out is built from the top; a restored mid-page scroll
// would land inside it half played.
history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
