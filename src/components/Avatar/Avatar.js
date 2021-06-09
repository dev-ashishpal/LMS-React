import React  from "react";
import userImage from "../../assets/images/user.jpg";
import classes from "./Avatar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const avatar = (props) => {
  let image = { ...props.teacherData };

  return (
    <figure className={classes.Avatar}>
      <NavLink
        to={
          props.isTeacherAuthenticated
            ? "/teacher/profile"
            : "/student/profile"
        }
      >
        <img
          src={image.image ? "http://localhost:8080/" + image.image : userImage}
          alt="user_image"
        />
      </NavLink>
    </figure>
  );
};

const mapStateToProps = (state) => {
  return {
    isTeacherAuthenticated: state.auth.teacherToken !== null,
    isStudentAuthenticated: state.auth.studentToken !== null,
    teacherData: state.profile.data,
  };
};

export default connect(mapStateToProps)(avatar);
