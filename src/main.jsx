import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./hooks/useCart";
import App from "./App";
import "./assets/styles/index.css";
import { CartUIProvider } from "./context/CartUIContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <CartUIProvider>
          <App />
        </CartUIProvider>
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
