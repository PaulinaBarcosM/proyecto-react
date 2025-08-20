import { Img, Box } from "@chakra-ui/react";

export const TestImage = () => (
  <Box w="300px" h="300px" border="1px solid red">
    <Img
      src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
      alt="Test"
      w="100%"
      h="100%"
      objectFit="cover"
    />
  </Box>
);
