import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "./layouts/MainLayout";
import { MainRouter } from "./router";
import { CartProvider } from "./context";

const App = () => {
  return (
    <ChakraProvider>
      <CartProvider>
        <MainLayout>
          <MainRouter />
        </MainLayout>
      </CartProvider>
    </ChakraProvider>
  );
};

export default App;
