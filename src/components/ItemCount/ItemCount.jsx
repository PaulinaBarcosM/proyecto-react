import { useEffect, useState, useRef } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const ItemCount = () => {
  const [state, setState] = useState(0);
  const handleAdd = () => {
    setState(state + 1);
  };
  const handleRemove = () => setState(state > 0 ? state - 1 : 0);

  return (
    <Flex gap={2} align="center">
      <Button onClick={handleRemove}>-</Button>
      <Text>{state}</Text>
      <Button onClick={handleAdd}>+</Button>
      <Button onClick={() => onAddToCart(state)} disabled={state === 0}>
        Agregar al carrito
      </Button>
    </Flex>
  );
};
