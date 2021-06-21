import React from "react";
import classes from "./ChatList.module.css";
import image from "../../assets/images/user1.jpg";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
  
const chatList = (props) => {
  let path;
  if (props.teacherToken) {
    path = "/teacher";
  } else if (props.studentToken) {
    path = "/student";
  }
  // console.log('chatlist',window.location.search.split('=')[1]);
  const urlParam = window.location.search.split('=')[1] ? window.location.search.split('=')[1] : null;
  // console.log('checking',urlParam, props.url);
  // console.log('chat-list',props.url);
  return (
    <NavLink
      to={path + "/messages/chat?k=" + props.link}
      className={classes.SidebarContainerBox}
      activeClassName={classes.active}
      isActive={() => false}
      // isActive={() => props.url === props.link ? 1 : 0 }
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
};

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

export default connect(mapStateToProps)(chatList);
