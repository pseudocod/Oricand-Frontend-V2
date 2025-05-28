import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "@/features/auth/context/UserContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
