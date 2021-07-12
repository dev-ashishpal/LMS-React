import React from "react";
import classes from "./SubmitBtn.module.css";

const submitButton = (props) => (
  <button
    onClick={props.clicked}
    className={classes.Btn}
    disabled={props.disabled}
  >
    Submit
  </button>
);

export default submitButton;
