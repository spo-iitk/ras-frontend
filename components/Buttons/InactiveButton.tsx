import { red } from "@mui/material/colors";
import Button, { ButtonProps } from "@mui/material/Button";
import styled from "@emotion/styled";

const InactiveButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  padding: "0.5rem 1rem",
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[500],
  },
}));

export default InactiveButton;
