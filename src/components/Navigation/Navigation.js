import React from "react";
import NavItems from "./NavigationItems/NavItems";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <React.Fragment>
      <aside className={classes.Sidebar}>
        <ul>
          <NavItems />
        </ul>
      </aside>
    </React.Fragment>
  );
};
export default Navigation;
