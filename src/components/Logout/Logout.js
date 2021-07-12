import React from "react";
import classes from "./Logout.module.css";
import Modal from "../UI/Modal/Modal";
import SubmitButton from "../UI/SubmitBtn/SubmitBtn";
import * as actionCreators from "../../store/actions/auth";
import { connect } from "react-redux";

class Logout extends React.Component {
  onLogoutHandler = () => {
    this.props.onTeacherLogout();
    this.props.onStudentLogout();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} clicked={this.props.clicked}>
          <div className={classes.Logout}>
            <h3>Are you sure you want to Logout?</h3>
            <div className={classes.Cta}>
              <SubmitButton disabled={false} clicked={this.onLogoutHandler} />
              <button className={classes.Cancel} onClick={this.props.clicked}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTeacherLogout: () => {
      dispatch(actionCreators.teacherLogout());
    },
    onStudentLogout: () => {
      dispatch(actionCreators.studentLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
