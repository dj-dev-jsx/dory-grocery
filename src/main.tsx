import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { StoreProvider } from './context/StoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
