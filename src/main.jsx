import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserContextProvider } from "./contexts/userContext";
import { CartContextProvider } from './contexts/cartContext';
import App from './App.jsx'
import { ProductProvider } from './contexts/productContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
    <UserContextProvider>
       <CartContextProvider>
      <App />
      </CartContextProvider>
    </UserContextProvider>
    </ProductProvider>
  </StrictMode>,
)
