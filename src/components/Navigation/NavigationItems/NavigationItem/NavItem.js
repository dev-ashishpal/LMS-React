import React from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className={classes.NavItem}>
      <NavLink activeClassName={classes.active} to={props.link}>
        <div className={classes.Icon}>
          <svg>
            <use href={props.icon}></use>
          </svg>
          {props.messages ? (
            <span className={classes.NewMessage}>&nbsp;</span>
          ) : null}
        </div>
        <span>{props.children}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
