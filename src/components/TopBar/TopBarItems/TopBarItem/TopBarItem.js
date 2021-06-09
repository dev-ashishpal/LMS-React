import React from "react";
import classes from "./TopBarItem.module.css";

const topBarItem = (props) => (
  <li className={classes.TopBarItem}>{props.children}</li>
);

export default topBarItem;
