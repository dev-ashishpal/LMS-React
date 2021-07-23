import React from "react";
import classes from "./ChatList.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const chatList = (props) => {
  let path;
  if (props.teacherToken) {
    path = "/teacher";
  } else if (props.studentToken) {
    path = "/student";
  }
  return (
    <article className={classes.SidebarContainer}>
      <NavLink
        to={path + "/messages/chat?k=" + props.link}
        className={classes.SidebarContainerBox}
        activeClassName={classes.Active}
        isActive={
          () => {
            let currentURL;
            if (props.teacherToken) {
              currentURL = window.location.search
                ? window.location.search.split("=")[1].replace("%20", " ")
                : null;
            } else if (props.studentToken) {
              currentURL = window.location.search.split("=")[1];
            }
            return currentURL === props.link;
          }
        }
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

chatList.propTypes = {
  teacherToken: PropTypes.string,
  studentToken: PropTypes.string,
  link: PropTypes.string,
};

export default connect(mapStateToProps)(chatList);
