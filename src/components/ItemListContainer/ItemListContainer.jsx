{
  /*import React from "react";

export const ItemListContainer = ({ greeting }) => {
  return (
    <div
      style={{
        fontSize: "2 rem",
        fontWeight: "bold",
        height: "90vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {greeting}
    </div>
  );
}; */
}

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
} from "@chakra-ui/react";

export const ItemListContainer = ({ products }) => {
  return (
    <Flex wrap="wrap" justify="center" gap={6} p={4}>
      {products.map((item) => {
        return (
          <Center py={12} key={item.id}>
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
            >
              <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  alt="#"
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={800}>
                  {item.name}
                </Heading>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
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
