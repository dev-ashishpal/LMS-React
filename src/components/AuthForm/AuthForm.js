import React, { Fragment } from "react";
import classes from "./AuthForm.module.css";
import TeacherLogin from "./LoginForm/TeacherLogin/TeacherLogin";
import TeacherSignup from "./SignupForm/TeacherSignup/TeacherSignup";
import StudentLogin from "./LoginForm/StudentLogin/StudenLogin";
import StudentSignup from "./SignupForm/StudentSignup/StudentSignup";
import PropTypes from "prop-types";

const authForm = (props) => {
  let login, signup;
  if (props.student) {
    login = <TeacherLogin />;
    signup = <TeacherSignup />;
  } else {
    login = <StudentLogin />;
    signup = <StudentSignup />;
  }
  return (
    <div className={classes.ModalContainer}>
      <button className={classes.ModalCancelBtn} onClick={props.closed}>
        &times;
      </button>

      {props.showLogin ? (
        <Fragment>
          {login}
          <button
            className={classes.FormSwitchBtn}
            onClick={props.studentHandler}
          >
            Switch To {props.student ? "Student" : "Teacher"}
          </button>
        </Fragment>
      ) : null}

      {props.showSignup ? (
        <Fragment>
          {signup}
          <button
            className={classes.FormSwitchBtn}
            onClick={props.studentHandler}
          >
            Switch To {props.student ? "Student" : "Teacher"}
          </button>
        </Fragment>
      ) : null}
    </div>
  );
};

authForm.propTypes = {
  studentHandler: PropTypes.func,
  closed: PropTypes.func,
  student: PropTypes.bool,
  showLogin: PropTypes.bool,
  showSignup: PropTypes.bool,
};

export default authForm;
