import React from "react";
import classes from "./TextInput.module.css";

const textInput = (props) => {
  let input;
  const inputClass = [classes.Input];
  // console.log("valid, touched", props.valid, props.touched);
  if (props.touched && !props.valid) {
    inputClass.push(classes.Invalid);
  }
  switch (props.inputtype) {
    case "input":
      input = <input className={inputClass.join(" ")} {...props} />;
      break;
    case "textarea":
      input = (
        <textarea
          className={inputClass.join(" ")}
          {...props}  
          maxLength={props.maxLength}
        />
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

export default textInput;
