import classes from "./HomepageNavigationItem.module.css";
import React from "react";

const homepageNavigationItem = (props) => {
    return (
        <React.Fragment>
            <li className={classes.NavigationItem}>
                {props.children}
            </li>
        </React.Fragment>
    )
}

export default homepageNavigationItem;