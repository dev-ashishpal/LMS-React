import React from "react";
import classes from "./TopBar.module.css";
import TopBarItems from "./TopBarItems/TopBarItems";

const topBar = () => {
  return (
    <nav className={classes.TopBar}>
      <header className={classes.HiddenElement}>
        <h1>TopBar Navigation</h1>
      </header>
      <ul className={classes.TopBarList}>
        <TopBarItems />
      </ul>
    </nav>
  );
};

export default topBar;
