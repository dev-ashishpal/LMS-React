import classes from "./HomepageNavigationItem.module.css";
import React, {Fragment} from "react";

const homepageNavigationItem = (props) => {
  return (
    <Fragment>
      <li className={classes.NavigationItem}>{props.children}</li>
    </Fragment>
  );
};

export default homepageNavigationItem;
