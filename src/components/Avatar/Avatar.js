import React from "react";
import userImage from "../../assets/images/user.png";
import classes from "./Avatar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { userAgent } from "../../util/userAgent";
import PropTypes from "prop-types";

const avatar = (props) => {
  const { userData, isTeacherAuthenticated } = props;
  let localhost = "localhost";
  if (userAgent()) {
    localhost = "192.168.43.135";
  }
  let image = { ...userData };

  return (
    <figure className={classes.Avatar}>
      <NavLink
        to={isTeacherAuthenticated ? "/teacher/profile" : "/student/profile"}
      >
        <img
          src={
            image.image
              ? "http://" + localhost + ":8080/" + image.imagePreview
              : userImage
          }
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
    userData: state.profile.data,
  };
};

avatar.propTypes = {
  isTeacherAuthenticated: PropTypes.bool,
  isStudentAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
};

export default connect(mapStateToProps)(avatar);
