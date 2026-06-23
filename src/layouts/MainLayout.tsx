import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Navbar />

      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
}
