import classes from "./HomepageNavigationItems.module.css";
import React from "react";
import NavItem from "./HomepageNavigationItem/HomepageNavigationItem";

const homepageNavigationItems = (props) => {
  return (
    <ul className={classes.NavigationList}>
      <NavItem>
        <a href="#">About</a>
      </NavItem>

      <NavItem>
        <a href="#">Help</a>
      </NavItem>

      <NavItem>
        <button onClick={props.showLoginHandler}>login</button>
      </NavItem>

      <NavItem>
        <button onClick={props.showSignupHandler}>Register</button>
      </NavItem>
    </ul>
  );
};
export default homepageNavigationItems;
