import { Box } from "@chakra-ui/react";
import { NavBar } from "../components";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      {children}
    </Box>
  );
};

export default MainLayout;
