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
            <Button onClick={handleRemoveItem} isDisabled={count === 0}>
              -
            </Button>
            <Text>{count}</Text>
            <Button onClick={handleAddItem} isDisabled={count >= item.stock}>
              +
            </Button>
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

export const ItemDetailContainer = ({ item }) => {
  const [count, setCount] = useState(0);
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddItem = () => {
    if (count < item.stock) {
      setCount(count + 1);
    }
  };

  const handleRemoveItem = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (count > 0) {
      addItem(item, count);
    }
  };

  return (
    <ItemDetail
      item={item}
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      handleAddToCart={handleAddToCart}
      count={count}
      setCount={setCount}
    />
  );
};
