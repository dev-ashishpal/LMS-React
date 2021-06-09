import React from "react";
import classes from "./TopBar.module.css";
import TopBarItems from "./TopBarItems/TopBarItems";

const topBar = () => {
  return (
    <nav className={classes.TopBar}>
      <ul className={classes.TopBarList}>
      <TopBarItems />
      </ul>
    </nav>
  );
};

export default topBar;
