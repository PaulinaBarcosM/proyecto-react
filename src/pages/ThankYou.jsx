import React from "react";
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

export const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //Recibimos el id de la orden desde el estado del navigate
  const orderId = location.state?.orderId;

  return (
    <Flex
      w="100vw"
      h="80vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      p={4}
    >
      <Heading mb={4}>¡Compra Exitosa!</Heading>
      {orderId && (
        <Text mb={6}>
          Tu orden se ha creado correctamente. ID de la orde:{" "}
          <strong>{orderId}</strong>
        </Text>
      )}
      <Button colorScheme="teal" onClick={() => navigate("/")}>
        Volver al Home
      </Button>
    </Flex>
  );
};
