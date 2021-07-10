import React, { Component, Fragment } from "react";
import classes from "./TeacherSignup.module.css";
import Input from "../../../UI/ProfileInput/ProfileInput";
import SubmitButton from "../../../UI/SubmitBtn/SubmitBtn";
import Select from "../../../UI/SelectDropdown/Select";
import {checkValidity} from "../../../../util/validators";
import * as actionCreators from '../../../../store/actions/index';
import {connect} from "react-redux";

let selectedData = [];

class TeacherSignup extends Component {
  state = {
    signupData: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Subject",
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
          {value: "IT Sem-1" },
          {value: "IT Sem-2" },
          {value: "IT Sem-3" },
          {value: "IT Sem-4" },
          {value: "IT Sem-5" },
          {value: "IT Sem-6" },
          {value: "IT Sem-7" },
          {value: "IT Sem-8" },
          {value: "CSE Sem-1" },
          {value: "CSE Sem-2" },
          {value: "CSE Sem-3" },
          {value: "CSE Sem-4" },
          {value: "CSE Sem-5" },
          {value: "CSE Sem-6" },
          {value: "CSE Sem-7" },
          {value: "CSE Sem-8" },
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
    // console.log("changed");
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
    // console.log("select Changed");
    if (event.target.checked) {
      selectedData.push(event.target.value);
      // console.log(selectedData);
    }
    if (!event.target.checked) {
      selectedData = selectedData.filter((data) => data !== event.target.value);
      // console.log(selectedData);
    }
    const branchesElement = { ...this.state.branches };
    branchesElement.value = selectedData;
    // console.log(branchesElement.value.length);
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
    const updatedData = { ...data, branches: this.state.branches.value };
    // console.log(updatedData);
    this.props.onSubmit(updatedData, selectedData);
  };

  render() {
    const data = [];
    for (let key in this.state.signupData) {
      data.push({ config: this.state.signupData[key], id: key });
    }

    return (
      <Fragment>
        <h1 className={classes.ModalHeading}>Teacher Signup</h1>
        <div>
          <form className={classes.Form} onSubmit={this.submitHandler}>
            <Select
                data={this.state.branches.elementConfig.options}
                changed={this.selectChangeHandler}
                selectType="checkbox"
                list={this.state.branches.value}
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
              <SubmitButton
                disabled={
                  !this.state.formIsValid || !this.state.selectFormIsValid
                }
              />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data, array) => {dispatch(actionCreators.teacherSignup(data, array))}
  }
}
export default connect(null, mapDispatchToProps)(TeacherSignup);
