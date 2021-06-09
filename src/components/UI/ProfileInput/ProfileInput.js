import React from "react";
import Select from "../SelectDropdown/Select";
import Option from "../SelectDropdown/Option/Option";


const profileInput = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <React.Fragment>
      <label>{props.label}</label>
      {inputElement}
    </React.Fragment>
  );
};

export default profileInput;
