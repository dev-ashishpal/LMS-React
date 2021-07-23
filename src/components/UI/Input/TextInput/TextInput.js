import React from "react";
import classes from "./TextInput.module.css";
import PropTypes from "prop-types";

const textInput = (props) => {
  let input;
  const inputClass = [classes.Input];
  if (props.touched && !props.valid) {
    inputClass.push(classes.Invalid);
  }
  switch (props.inputtype) {
    case "input":
      input = <input className={inputClass.join(" ")} {...props} />;
      break;
    case "textarea":
      input = (
        <div>
          <textarea
            className={inputClass.join(" ")}
            maxLength={props.maxLength}
            {...props}
          />
        </div>
      );
      break;
    default:
      input = <input className={inputClass.join(" ")} {...props} />;
  }
  return (
    <div className={classes.TextInput}>
      <label>{props.label}</label>
      {input}
    </div>
  );
};

textInput.propTypes = {
  inputtype: PropTypes.oneOf(["input", "textarea", "select"]),
  touched: PropTypes.number /* not a number but boolean 0 1 */,
  valid: PropTypes.number /* not a number but boolean 0 1 */,
  label: PropTypes.string,
  maxLength: PropTypes.number,
};

export default textInput;
