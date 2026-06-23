// src/theme/theme.ts

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#8B5CF6",
    },

    background: {
      default: "#050505",
      paper: "#111111",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});