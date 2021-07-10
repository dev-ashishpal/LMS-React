import React from "react";
import NavItem from "./NavigationItem/NavItem";
import sprite from "../../../assets/svg/sprite.svg";
import { connect } from "react-redux";

const navItems = (props) => {
  // render() {
  let items;
  if (props.isTeacherAuthenticated) {
    items = (
      <React.Fragment>
        <NavItem link="/teacher/dashboard" icon={sprite + "#icon-home1"}>
          Home
        </NavItem>
        <NavItem link="/teacher/lectures" icon={sprite + "#icon-images"}>
          Lectures
        </NavItem>
        <NavItem link="/teacher/messages" icon={sprite + "#icon-message"}>
          Messages
        </NavItem>
      </React.Fragment>
    );
  }
  if (props.isStudentAuthenticated) {
    items = (
      <React.Fragment>
        <NavItem link="/student/dashboard" icon={sprite + "#icon-home1"}>
          Home
        </NavItem>
        <NavItem link="/student/lectures" icon={sprite + "#icon-images"}>
          Lectures
        </NavItem>
        <NavItem link="/student/messages" icon={sprite + "#icon-message"}>
          Messages
        </NavItem>
        <NavItem link="/student/classmates" icon={sprite + "#icon-users"}>
          Classmates
        </NavItem>
      </React.Fragment>
    );
  }
  return <React.Fragment>{items}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    isTeacherAuthenticated: state.auth.teacherToken !== null,
    isStudentAuthenticated: state.auth.studentToken !== null,
    newMessage: state.message.newMessage,
  };
};

export default connect(mapStateToProps)(navItems);
