import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2B4162",
    },
    secondary: {
      main: "#385F71",
    },
  },
  typography: {
    fontFamily:
      '"IBM Plex Sans","Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
