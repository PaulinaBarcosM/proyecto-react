import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../context";

export const ItemDetail = ({
  item,
  handleAddItem,
  handleRemoveItem,
  count,
  setCount,
  handleNavigateCheckout,
}) => {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={item.image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {item.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              ${item.price} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{item.description}</Text>
            </VStack>
          </Stack>
          <Flex>
            <Text>
              Stock:{" "}
              {item.stock < 20 ? "Ultimas unidades disponibles" : item.stock}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            width={"20%"}
            alignItems={"center"}
          >
            <Button onClick={handleRemoveItem}>-</Button>
            <Text>{count}</Text>
            <Button onClick={handleAddItem}>+</Button>
          </Flex>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <Button onClick={handleNavigateCheckout}>Add to Cart</Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business day delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { addItem, removeItem } = useContext(CartContext);
  const { id } = useParams();
  const nagivate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddItem = () => {
    const newCount = count + 1;
    setCount(newCount);
    addItem(item, newCount);
  };

  const handleRemoveItem = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    removeItem(item);
  };

  const handleNavigateCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Flex height="80vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!item) return <Text>Producto no encontrado</Text>;

  return (
    <ItemDetail
      item={item}
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      count={count}
      handleNavigateCheckout={handleNavigateCheckout}
    />
  );
};
