import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./LectureNavigationItem.module.css";

const lectureNavigationItem = (props) => (
  <NavLink activeClassName={classes.active} className={classes.LectureNavigationItem} to={props.link}>
    {props.children}
  </NavLink>
);

export default lectureNavigationItem;
