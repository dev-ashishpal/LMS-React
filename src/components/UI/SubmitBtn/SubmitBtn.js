import React from "react";
import classes from "./SubmitBtn.module.css";
import PropTypes from "prop-types";

const submitButton = (props) => (
  <button
    onClick={props.clicked}
    className={classes.Btn}
    disabled={props.disabled}
  >
    Submit
  </button>
);

submitButton.propTypes = {
  disabled: PropTypes.bool,
  clicked: PropTypes.func,
};

export default submitButton;
