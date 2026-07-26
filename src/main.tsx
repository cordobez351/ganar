import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/almarai/400.css'
import '@fontsource/almarai/700.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
