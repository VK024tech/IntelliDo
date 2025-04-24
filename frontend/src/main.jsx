import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider, UserContext } from "./contexts/UserContext.jsx";
import { TodoContextProvider } from "./contexts/TodoContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <UserContextProvider>
    <TodoContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoContextProvider>
  </UserContextProvider>

  // </StrictMode>,
);
