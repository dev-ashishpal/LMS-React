import React from "react";
import hero from "../../assets/images/bg.jpg";
import classes from "./Homepage.module.css";
import Modal from "../../components/UI/Modal/Modal";
// import Logo from "../../components/Logo/Logo";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Redirect } from "react-router-dom";
// import MenuDropdown from "../../components/UI/MenuDropdown/MenuDropdown";
// import { positionMenuDropdown } from "../../util/menuDropdown";
import HomepageNavigation from "../../components/HomepageNavigation/HomepageNavigation";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.menuDropdownRef = React.createRef();
  }

  state = {
    showMenu: false,
    student: false,
  };

  studentHandler = () => {
    this.setState((prevState) => {
      return { student: !prevState.student };
    });
  };

  render() {
    let error = this.props.error;
    // setTimeout(() => {
    //   error = null;
    //   console.log('removed!',error);
    // }, 1000);
    let auth;
    if (this.props.isTeacherAuthenticated) {
      auth = <Redirect to="/teacher/dashboard" />;
    }
    if (this.props.isStudentAuthenticated) {
      auth = <Redirect to="/student/dashboard" />;
    }

    return (
      <React.Fragment>
        {error ? (
          <ErrorModal error>{error}</ErrorModal>
        ) : null}

        {auth}
        <div
          className={classes.Container}
          style={{
            background: `url(${hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={classes.ContainerFluid}>
            <HomepageNavigation
              showLoginHandler={this.props.onShowLogin}
              showSignupHandler={this.props.onShowSignup}
            />
            <div className={classes.Header}>
              <h2>the</h2>
              <h1>lms</h1>
            </div>
            <div className={classes.Cta}>
              <button className={classes.CtaBtn}>Explore</button>
            </div>
          </div>

          <Modal show={this.props.show} clicked={this.props.onCloseModal}>
            <AuthForm
              closed={this.props.onCloseModal}
              showLogin={this.props.showLogin}
              showSignup={this.props.showSignup}
              student={this.state.student}
              studentHandler={this.studentHandler}
            />
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    showLogin: state.auth.showLogin,
    showSignup: state.auth.showSignup,
    show: state.auth.show,
    isTeacherAuthenticated: state.auth.teacherToken !== null,
    isStudentAuthenticated: state.auth.studentToken !== null,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowLogin: () => {
      dispatch(actionCreators.showLogin());
    },
    onShowSignup: () => {
      dispatch(actionCreators.showSignup());
    },
    onCloseModal: () => {
      dispatch(actionCreators.closeModal());
    },
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Homepage);
