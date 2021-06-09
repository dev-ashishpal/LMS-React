import React from "react";
import NavItem from "./NavigationItem/NavItem";
import sprite from "../../../assets/svg/sprite.svg";
import { connect } from "react-redux";

class NavItems extends React.Component {
  render() {
    let items;
    if (this.props.isTeacherAuthenticated) {
      items = (
        <React.Fragment>
          <NavItem link="/teacher/dashboard" icon={sprite + "#icon-home1"}>
            Home
          </NavItem>
          <NavItem
            link="/teacher/lectures"
            icon={sprite + "#icon-account_balance"}
          >
            Lectures
          </NavItem>
          <NavItem link="/teacher/messages" icon={sprite + "#icon-message"}>
            Messages
          </NavItem>
        </React.Fragment>
      );
    }
    if (this.props.isStudentAuthenticated) {
      items = (
        <React.Fragment>
          <NavItem link="/student/dashboard" icon={sprite + "#icon-home1"}>
            Home
          </NavItem>
          <NavItem
            link="/student/lectures"
            icon={sprite + "#icon-account_balance"}
          >
            Lectures
          </NavItem>
          <NavItem link="/student/messages" icon={sprite + "#icon-message"}>
            Messages
          </NavItem>
        </React.Fragment>
      );
    }
    return <React.Fragment>{items}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    isTeacherAuthenticated: state.auth.teacherToken !== null,
    isStudentAuthenticated: state.auth.studentToken !== null,
  };
};

export default connect(mapStateToProps)(NavItems);
