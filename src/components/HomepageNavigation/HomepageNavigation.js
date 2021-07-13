import Logo from "../Logo/Logo";
import React from "react";
import classes from "./HomePageNavigation.module.css";
import NavItems from "./HomepageNavigationItems/HomepageNavigationItems";

const homepageNavigation = (props) => {
  return (
    <nav className={classes.Navbar}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <NavItems
        showLoginHandler={props.showLoginHandler}
        showSignupHandler={props.showSignupHandler}
      />
    </nav>
  );
};

export default homepageNavigation;
