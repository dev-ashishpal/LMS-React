import React from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const navItem = (props) => {
  return (
    <li className={classes.NavItem}>
      <NavLink activeClassName={classes.active} to={props.link}>
        <div className={classes.Icon}>
          <svg>
            <use href={props.icon}></use>
          </svg>
        </div>
        <span>{props.children}</span>
      </NavLink>
    </li>
  );
};

navItem.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
};

export default navItem;
