import React from "react";
import classes from "./ChatList.module.css";
import image from "../../assets/images/user1.jpg";
import { NavLink } from "react-router-dom";

const chatList = (props) => (
  <NavLink
    to="#"
    className={classes.SidebarContainerBox}
    activeClassName={classes.active}
  >
    <figure className={classes.SidebarImg}>
      <img src={image} alt="user_image" />
    </figure>
    <div className={classes.SidebarHeading}>
      <h5>{props.children}</h5>
    </div>
    <span className={classes.SidebarNotificationIcon}>&nbsp;</span>
  </NavLink>
);

export default chatList;
