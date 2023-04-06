import React from "react";
import ReactDOM from "react-dom/client";
import { WrappedApp } from "./App";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <WrappedApp />
    </ChakraProvider>
  </React.StrictMode>
);