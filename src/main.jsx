import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { CartProvider } from "./Pages/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
