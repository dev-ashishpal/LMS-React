import Logo from "../Logo/Logo";
import React from "react";
import classes from "./HomePageNavigation.module.css";
import NavItems from "./HomepageNavigationItems/HomepageNavigationItems";
import PropTypes from "prop-types";

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

homepageNavigation.propTypes = {
  showLoginHandler: PropTypes.func,
  showSignupHandler: PropTypes.func,
};

export default homepageNavigation;
