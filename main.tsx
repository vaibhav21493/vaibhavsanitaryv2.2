import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import RouterApp from "./app/RouterApp";
import { AuthProvider } from "./app/auth/AuthProvider";
import { ShopProvider } from "./app/shop/ShopContext";
import "./styles/index.css";
createRoot(document.getElementById("root")!).render(
  <ShopProvider>
    <AuthProvider>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </AuthProvider>
  </ShopProvider>,
);