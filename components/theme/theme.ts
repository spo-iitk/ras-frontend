import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B7682",
      dark: "#455A64",
    },
    secondary: {
      main: "#FF725E",
      light: "#EB8D81",
      contrastText: "#000000",
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
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#F5B798",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#FACCB6",
          },
        },
      },
    },
  },
});

export default theme;
