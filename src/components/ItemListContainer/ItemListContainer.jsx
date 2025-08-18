import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

export const ItemListContainer = ({ products }) => {
  return (
    <Flex wrap="wrap" justify="center" gap={6} p={4}>
      {products?.map((item) => {
        return (
          <Center py={10} key={item.id}>
            <Box
              role={"group"}
              p={6}
              maxW={"330px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
              minH="450px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
                <Image
                  src={item.image}
                  rounded={"lg"}
                  height={240}
                  width={280}
                  objectFit={"cover"}
                  alt={item.title}
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Heading
                  fontSize={"xl"}
                  fontFamily={"body"}
                  fontWeight={800}
                  textAlign="center"
                  noOfLines={2}
                >
                  {item.title}
                </Heading>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                  noOfLines={1}
                >
                  {item.description}
                </Text>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={800} fontSize={"xl"}>
                    ${item.price}
                  </Text>
                </Stack>

                {/* Botón agregado aquí */}
                <Button
                  mt={2}
                  colorScheme="gray"
                  variant="solid"
                  size="md"
                  fontSize="md"
                  px={8}
                  py={6}
                  fontWeight="bold"
                  _hover={{ bg: "gray.600" }}
                  as={Link}
                  to={`/item/${item.id}`}
                >
                  View more
                </Button>
              </Stack>
            </Box>
          </Center>
        );
      })}
    </Flex>
  );
};
