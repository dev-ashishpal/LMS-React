import React from "react";
import NavItems from "./NavigationItems/NavItems";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <React.Fragment>
      <aside className={classes.Sidebar}>
        <header className={classes.HiddenElement}>
          <h1>SideBar Navigation</h1>
        </header>
        <ul>
          <NavItems />
        </ul>
      </aside>
    </React.Fragment>
  );
};
export default Navigation;
