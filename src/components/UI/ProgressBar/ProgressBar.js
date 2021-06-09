import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

const progressBar = () => {
  TopBarProgress.config({
    barColors: {
      0: "#58DEE0",
      "1.0": "#58DEE0",
    },
    shadowBlur: 0,
    barThickness: 4,
  });
  return <TopBarProgress />;
};

export default progressBar;
