import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#140152",
      dark: "#04052E",
    },
    secondary: {
      main: "#22007C",
      light: "#0D00A4",
      contrastText: "#918EF4",
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
            backgroundColor: "#140152",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#110240",
          },
        },
      },
    },
  },
});

export default theme;
