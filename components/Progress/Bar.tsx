import React from "react";

import theme from "@components/theme/theme";

function Bar({ animationDuration, progress }: any) {
  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
        height: 10,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 10,
      }}
    />
  );
}

export default Bar;
