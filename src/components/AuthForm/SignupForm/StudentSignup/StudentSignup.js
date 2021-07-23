import React, { Component, Fragment } from "react";
import classes from "./StudentSignup.module.css";
import Input from "../../../UI/ProfileInput/ProfileInput";
import SubmitButton from "../../../UI/SubmitBtn/SubmitBtn";
import Select from "../../../UI/SelectDropdown/Select";
import { checkValidity } from "../../../../util/validators";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import PropTypes from "prop-types";

class StudentSignup extends Component {
  state = {
    signupData: {
      roll: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Roll No.",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isNumber: true,
        },
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        validation: {
          required: true,
        },
        value: "",
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true,
        },
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Re-enter Password",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    branches: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "IT Sem-1" },
          { value: "IT Sem-2" },
          { value: "IT Sem-3" },
          { value: "IT Sem-4" },
          { value: "IT Sem-5" },
          { value: "IT Sem-6" },
          { value: "IT Sem-7" },
          { value: "IT Sem-8" },
          { value: "CSE Sem-1" },
          { value: "CSE Sem-2" },
          { value: "CSE Sem-3" },
          { value: "CSE Sem-4" },
          { value: "CSE Sem-5" },
          { value: "CSE Sem-6" },
          { value: "CSE Sem-7" },
          { value: "CSE Sem-8" },
        ],
      },
      value: [],
      valid: false,
      touched: false,
      validation: {
        required: false,
      },
    },
    formIsValid: false,
    selectFormIsValid: false,
  };

  onChangeHandler = (event, identifier) => {
    const updatedSignupData = { ...this.state.signupData };
    const updatedSignupElement = { ...updatedSignupData[identifier] };
    updatedSignupElement.value = event.target.value;
    updatedSignupElement.valid = checkValidity(
      updatedSignupElement.value,
      updatedSignupElement.validation
    );
    updatedSignupElement.touched = true;
    updatedSignupData[identifier] = updatedSignupElement;
    let formIsValid = true;
    for (let identifier in updatedSignupData) {
      formIsValid = updatedSignupData[identifier].valid && formIsValid;
    }
    this.setState({ signupData: updatedSignupData, formIsValid });
  };

  selectChangeHandler = (event) => {
    let selectedData = [];
    selectedData.push(event.target.value);

    const branchesElement = { ...this.state.branches };
    branchesElement.value = selectedData;
    branchesElement.valid = branchesElement.value.length !== 0;
    branchesElement.touched = true;
    let selectFormIsValid = true;
    selectFormIsValid = branchesElement.valid && selectFormIsValid;
    this.setState({ branches: branchesElement, selectFormIsValid });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const data = {};
    for (let key in this.state.signupData) {
      data[key] = this.state.signupData[key].value;
    }
    const updatedData = { ...data, branch: this.state.branches.value[0] };
    this.props.onSubmit(updatedData);
  };

  render() {
    const { signupData, branches, formIsValid, selectFormIsValid } = this.state;
    const data = [];
    for (let key in signupData) {
      data.push({ config: signupData[key], id: key });
    }

    return (
      <Fragment>
        <h1 className={classes.ModalHeading}>Student Signup</h1>
        <div>
          <form className={classes.Form} onSubmit={this.submitHandler}>
            <Select
              data={branches.elementConfig.options}
              changed={this.selectChangeHandler}
              selectType="radio"
              list={branches.value}
            />
            {data.map((signupData) => {
              const signupClasses = [classes.TextInput];
              if (
                !signupData.config.valid &&
                signupData.config.touched &&
                signupData.config.validation
              ) {
                signupClasses.push(classes.Invalid);
              }
              return (
                <div className={signupClasses.join(" ")} key={signupData.id}>
                  <Input
                    elementType={signupData.config.elementType}
                    elementConfig={signupData.config.elementConfig}
                    value={signupData.config.value}
                    changed={(event) => {
                      this.onChangeHandler(event, signupData.id);
                    }}
                  />
                </div>
              );
            })}

            <div className={classes.SubmitBtn}>
              <SubmitButton disabled={!formIsValid || !selectFormIsValid} />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(actionCreators.studentSignup(data));
    },
  };
};

StudentSignup.propTypes = {
  onSubmit: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(StudentSignup);
