import { green } from "@mui/material/colors";
import Button, { ButtonProps } from "@mui/material/Button";
import styled from "@emotion/styled";

const ActiveButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  borderRadius: 10,
  padding: "0.5rem 1rem",
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[500],
  },
  // width: 100,
}));

export default ActiveButton;
