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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CartWidget } from "../CartWidget";

const categorias = ["Home", "Productos", "Contacto"];

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

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
      >
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
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
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

          <Flex ml="auto" mr={20} display={{ base: "none", md: "flex" }}>
            <Stack direction={"row"} spacing={4} align={"center"}>
              {categorias.map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  fontWeight="normal"
                  href={`/${cat.toLowerCase()}`}
                  as="a"
                >
                  {cat}
                </Button>
              ))}
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          align={"center"}
        >
          <CartWidget />

          {/* Botón modo oscuro */}
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
        </Stack>
      </Flex>

      {/* Menú colapsable (visible solo cuando se hace toggle en mobile) */}
      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg={useColorModeValue("gray.100", "gray.700")}>
          <Stack as={"nav"} spacing={4}>
            {categorias.map((cat) => (
              <Box as="a" href={`/${cat.toLowerCase()}`} key={cat}>
                {cat}
              </Box>
            ))}

            {/* Agregamos Sign Up en mobile */}
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
