import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./themes/theme";
import { ThemeProvider } from "@emotion/react";
import { EventContextProvider } from "./contexts/event.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
