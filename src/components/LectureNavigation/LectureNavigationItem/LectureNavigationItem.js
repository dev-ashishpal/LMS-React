import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./LectureNavigationItem.module.css";
import PropTypes from "prop-types";

const lectureNavigationItem = (props) => (
  <NavLink activeClassName={classes.active} className={classes.LectureNavigationItem} to={props.link}>
    {props.children}
  </NavLink>
);

lectureNavigationItem.propTypes = {
  link: PropTypes.string,
};

export default lectureNavigationItem;
