import React, { useContext, useState } from "react";
import { Flex, Button, Input, Heading, useToast } from "@chakra-ui/react";
import { CartContext } from "../context";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { cartState, clearCart } = useContext(CartContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    if (name === "" || lastName === "" || email === "") {
      toast({
        title: "Faltaron datos!",
        description: "Debes completar todos los campos.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    const total = cartState.reduce(
      (acc, item) => acc + item.price * item.qtyItem,
      0
    );
    const orderObj = {
      buyer: {
        name,
        lastName,
        email,
      },
      items: cartState.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qtyItem,
      })),
      total,
    };

    try {
      const ordersCollection = collection(db, "orders");
      const docRef = await addDoc(ordersCollection, orderObj);

      //mostrar toast de éxito
      toast({
        title: "Compra exitosa!",
        description: `Tu orden se creó correctamente. ID: ${docRef.id}`,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });

      //Liampiar formulario y carrito
      setName("");
      setLastName("");
      setEmail("");
      if (clearCart) clearCart(); //vaciar carrito si tenes la función

      navigate("/thank-you", { state: { orderId: docRef.id } });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al crear la orden",
        description: "Intenta nuevamente más tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Flex
      w={"100vw"}
      h={"60vh"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Heading mb={6}>Datos para la compra</Heading>
      <Flex flexDirection={"column"} w={{ base: "90vw", md: "50vw" }} gap={3}>
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Correo electronico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button colorScheme="teal" size="lg" mt={4} onClick={handleCreateOrder}>
          Confirmar Compra
        </Button>
      </Flex>
    </Flex>
  );
};
