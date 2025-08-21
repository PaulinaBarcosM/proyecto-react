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
  count,
  handleAddItem,
  handleRemoveItem,
  handleAddToCart,
}) => {
  return (
    <Container maxW="7xl" py={10}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
        <Flex>
          <Image
            src={item?.images?.[0] ?? "/placeholder.png"}
            alt={item?.title ?? "Product Image"}
            rounded="md"
            objectFit="cover"
            w="100%"
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>

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
          <Flex>
            <Text>
              Stock:{" "}
              {item.stock < 20 ? "Ultimas unidades disponibles" : item.stock}
            </Text>
          </Flex>

          {/* Contador */}
          <Flex justify="start" align="center" gap={3}>
            <Button onClick={handleRemoveItem}>-</Button>
            <Text>{count}</Text>
            <Button onClick={handleAddItem}>+</Button>
          </Flex>

          {/* Botón Add to Cart */}
          <Button
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Flex align="center" gap={2}>
            <MdLocalShipping />
            <Text>2-3 business day delivery</Text>
          </Flex>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1); // ✅ iniciamos en 1
  const [loading, setLoading] = useState(true);

  const { addItem, removeItem } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
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
    if (count < product.stock) {
      setCount(count + 1);
    }
  };
  const handleRemoveItem = () => setCount(count > 1 ? count - 1 : 1);

  const handleAddToCart = () => {
    addItem(product, count); // ✅ agregamos al carrito la cantidad seleccionada
    // navigate("/checkout"); // opcional, solo si quieres ir al checkout automáticamente
  };

  if (loading)
    return (
      <Flex height="80vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );

  if (!product) return <Text>Producto no encontrado</Text>;

  return (
    <ItemDetail
      item={product}
      count={count}
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      handleAddToCart={handleAddToCart}
    />
  );
};
