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
  Spinner,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context";
import { useParams, useNavigate } from "react-router-dom";

export const ItemDetail = ({
  item,
  handleAddItem,
  handleRemoveItem,
  count,
  handleNavigateCheckout,
}) => {
  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        {/* Imagen del producto */}
        <Flex>
          <Image
            src={item.image}
            alt={item.title}
            rounded="md"
            objectFit="cover"
            w="100%"
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>

        {/* Detalles del producto */}
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
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
              fontSize="2xl"
              mt={2}
            >
              ${item.price} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction="column"
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize="lg">{item.description}</Text>
            </VStack>
          </Stack>

          {/* Contador */}
          <Flex justify="start" align="center" gap={3}>
            <Button onClick={handleRemoveItem}>-</Button>
            <Text>{count}</Text>
            <Button onClick={handleAddItem}>+</Button>
          </Flex>

          {/* Botón agregar al carrito */}
          <Button
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            onClick={handleNavigateCheckout}
          >
            Add to Cart
          </Button>

          {/* Info de envío */}
          <Flex align="center" gap={2}>
            <MdLocalShipping />
            <Text>2-3 business day delivery</Text>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export const ItemDetailContainer = ({ item }) => {
  const [product, setProduct] = useState(null);
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
        setProduct(data);
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
    addItem(product, newCount);
  };

  const handleRemoveItem = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    removeItem(product);
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

  if (!product) return <Text>Producto no encontrado</Text>;

  return (
    <ItemDetail
      item={product}
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      count={count}
      handleNavigateCheckout={handleNavigateCheckout}
    />
  );
};
