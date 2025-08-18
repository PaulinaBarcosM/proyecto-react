import { useEffect, useState, useRef } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const ItemCount = () => {
  const [state, setState] = useState(0);

  const handleAdd = () => {
    setState(state + 1);
  };

  const handleRemove = () => {
    setState(state - 1);
  };

  useEffect(() => {
    console.log("useEffect con dependencias vacias");
  }, []);

  return (
    <Flex>
      <Button onClick={handleRemove}>-</Button>
      <Text>{state}</Text>
      <Button onClick={handleAdd}>+</Button>
      <Button onClick={BotonAgregarAlCarritot}>Agregar al carrito</Button>
    </Flex>
  );
};
