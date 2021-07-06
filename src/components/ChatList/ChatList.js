import React from "react";
import classes from "./ChatList.module.css";
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
  // const urlParam = window.location.search.split("=")[1]
  //   ? window.location.search.split("=")[1]
  //   : null;
  // console.log('checking',urlParam, props.url);
  // console.log('chat-list',props.url);
  return (
    <article className={classes.SidebarContainer}>
      <NavLink
        to={path + "/messages/chat?k=" + props.link}
        className={classes.SidebarContainerBox}
        activeClassName={classes.active}
        isActive={() => false}
      >
        <div className={classes.SidebarHeading}>
          <h3>{props.children}</h3>
        </div>
        <span className={classes.SidebarNotificationIcon}>&nbsp;</span>
      </NavLink>
    </article>
  );
};

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

export default connect(mapStateToProps)(chatList);
