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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { CartWidget } from "../CartWidget";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { categories, loading } = useCategories();
  const toast = useToast();

  // === modal para SING UP Y SING IN ===
  const [modalType, setModalType] = useState("");
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  // Función para abrir modal según tipo
  const handleModal = (type) => {
    setModalType(type);
    onModalOpen();
  };

  //Form state
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (modalType === "signup") {
      if (!formData.name) newErrors.name = "Nombre obligatorio";
      if (!formData.dni) newErrors.dni = "DNI obligatorio";
    }
    if (!formData.email) newErrors.email = "Email obligatorio";
    if (!formData.password) newErrors.password = "Contraseá obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (modalType === "signup") {
      // Simulamos guardar el usuario en localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      toast({
        title: "Registro exitoso",
        description: `Bienvenido ${formData.name}!`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      // Simulamos login
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        toast({
          title: "Inicio de sesión exitoso",
          description: `Hola ${user.name || user.email}!`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description: "Email o contraseña incorrectos",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    }

    onModalClose();
    setFormData({ name: "", dni: "", email: "", password: "" });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("gray.50", "gray.800")}
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
                      <MenuItem key={cat.slug}>
                        <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
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
            onClick={() => handleModal("signup")}
          >
            Sign Up
          </Button>

          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            onClick={() => handleModal("signin")}
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
                <Box as={Link} to={`/category/${cat.slug}`} key={cat.slug}>
                  {cat.name}
                </Box>
              ))
            )}

            {/* Sign Up en mobile */}
            <Button
              as="a"
              variant="outline"
              size="sm"
              width="fit-content"
              onClick={() => handleModal("signup")}
            >
              Sign Up
            </Button>

            <Button
              as="a"
              variant="outline"
              size="sm"
              width="fit-content"
              //alignSelf="start"
              onClick={() => handleModal("signin")}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Collapse>

      {/* Modal para Sign Up / Sign In */}
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === "signup" ? "Sign Up" : "Sign In"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                {modalType === "signup" && (
                  <>
                    <FormControl isInvalid={errors.name}>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.dni}>
                      <FormLabel>DNI</FormLabel>
                      <Input
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        placeholder="Tu DNI"
                      />
                      <FormErrorMessage>{errors.dni}</FormErrorMessage>
                    </FormControl>
                  </>
                )}

                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button colorScheme="teal" type="submit" w="full">
                  {modalType === "signup" ? "Registrarse" : "Iniciar Sesión"}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
