import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CartWidget } from "../CartWidget";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const { categories, loading } = useCategories();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"center"}
      >
        {/* Botón hamburguesa (mobile) */}
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        {/* LOGO */}
        <Flex flex={1} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontSize="18px"
            fontWeight="bold"
            color={useColorModeValue("gray.800", "white")}
            alignSelf="center"
            ml={{ base: 4, md: 5 }}
          >
            Logo
          </Text>

          {/* Menú Principal */}
          <Flex
            flex={1}
            justify="center"
            ml="13%"
            display={{ base: "none", md: "flex" }}
          >
            <Stack direction={"row"} spacing={4} align="center">
              <Button variant="solid" colorScheme="gray" as={Link} to="/">
                Home
              </Button>

              {/* Menú de categorías */}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="solid"
                  colorScheme="gray"
                  cursor="pointer"
                >
                  Categorías
                </MenuButton>
                <MenuList height={"300px"} overflowY={"scroll"}>
                  {loading ? (
                    <Flex justify="center" p={4}>
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="md"
                      />
                    </Flex>
                  ) : (
                    categories.map((cat) => (
                      <MenuItem key={cat}>
                        <Link to={`/category/${cat}`}>{cat}</Link>
                      </MenuItem>
                    ))
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {/* Botones a la derecha: carrito, modo oscuro y Sign Up */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={4}
          align={"center"}
        >
          <CartWidget />

          <Button onClick={toggleColorMode} size="sm">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Sign Up
          </Button>

          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Sign In
          </Button>
        </Stack>
      </Flex>

      {/* Menú colapsable (mobile) */}
      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg={useColorModeValue("gray.100", "gray.700")}>
          <Stack as={"nav"} spacing={4}>
            <Box as="a" href={`/`} key="home">
              Home
            </Box>

            {loading ? (
              <Flex justify="center" p={4}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
              </Flex>
            ) : (
              categories.map((cat) => (
                <Box as={Link} to={`/category/${cat}`} key={cat}>
                  {cat}
                </Box>
              ))
            )}

            {/* Sign Up en mobile */}
            <Button
              as="a"
              href="#"
              variant="outline"
              size="sm"
              width="fit-content"
              alignSelf="start"
            >
              Sign Up
            </Button>

            <Button
              as="a"
              href="#"
              variant="outline"
              size="sm"
              width="fit-content"
              alignSelf="start"
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
