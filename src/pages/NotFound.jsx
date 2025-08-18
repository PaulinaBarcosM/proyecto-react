import { Box } from "@chakra-ui/react";
import React from "react";

export const NotFound = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        fontWeight: "bold",
        fontSize: "40px",
      }}
    >
      <div
        style={{
          fontWeight: "800",
          fontSize: "100px",
          color: "red",
        }}
      >
        404
      </div>
      <div>page NotFound</div>
    </Box>
  );
};
