import React, { Component, Fragment } from "react";
import classes from "./TeacherLogin.module.css";
import Input from "../../../UI/ProfileInput/ProfileInput";
import SubmitButton from "../../../UI/SubmitBtn/SubmitBtn";
import { checkValidity } from "../../../../util/validators";
import * as actionCreators from "../../../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TeacherLogin extends Component {
  state = {
    loginData: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        value: "",
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  onChangeHandler = (event, identifier) => {
    const updatedLoginData = { ...this.state.loginData };
    const updatedLoginElement = { ...updatedLoginData[identifier] };
    updatedLoginElement.value = event.target.value;
    updatedLoginElement.valid = checkValidity(
      updatedLoginElement.value,
      updatedLoginElement.validation
    );

    updatedLoginElement.touched = true;

    updatedLoginData[identifier] = updatedLoginElement;
    let formIsValid = true;
    for (let identifier in updatedLoginData) {
      formIsValid = updatedLoginData[identifier].valid && formIsValid;
    }
    this.setState({ loginData: updatedLoginData, formIsValid });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (let key in this.state.loginData) {
      data[key] = this.state.loginData[key].value;
    }
    this.props.onSubmit(data);
  };

  render() {
    const data = [];
    for (let key in this.state.loginData) {
      data.push({ config: this.state.loginData[key], id: key });
    }
    let authRedirect;
    if (this.props.isTeacherAuthenticated) {
      authRedirect = <Redirect to="/teacher/dashboard" />;
    }
    return (
      <Fragment>
        {authRedirect}
        <h1 className={classes.ModalHeading}>Teacher Login</h1>
        <div>
          <form className={classes.Form} onSubmit={this.submitHandler}>
            {data.map((loginData) => {
              const inputClasses = [classes.TextInput];
              if (
                !loginData.config.valid &&
                loginData.config.touched &&
                loginData.config.validation
              ) {
                inputClasses.push(classes.Invalid);
              }
              return (
                <div className={inputClasses.join(" ")} key={loginData.id}>
                  <Input
                    elementType={loginData.config.elementType}
                    elementConfig={loginData.config.elementConfig}
                    value={loginData.config.value}
                    changed={(event) => {
                      this.onChangeHandler(event, loginData.id);
                    }}
                  />
                </div>
              );
            })}
            <div className={classes.SubmitBtn}>
              <SubmitButton disabled={!this.state.formIsValid} />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isTeacherAuthenticated: state.auth.teacherToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(actionCreators.teacherLogin(data));
    },
  };
};

TeacherLogin.propTypes = {
  isTeacherAuthenticated: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLogin);
