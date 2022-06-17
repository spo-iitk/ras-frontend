/* eslint-disable import/prefer-default-export */
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { showNotification } from "@mantine/notifications";

import { SERVER_ERROR } from "./constants";

const errorNotification = (title: string, imessage: string | undefined) => {
  let message = "";
  if (imessage === undefined) {
    message = SERVER_ERROR;
  } else {
    message = imessage;
  }

  showNotification({
    title,
    message,
    color: "red",
    icon: <CloseIcon />,
  });
};

export { errorNotification };
