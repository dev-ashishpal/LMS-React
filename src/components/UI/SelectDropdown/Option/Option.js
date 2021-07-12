import React from "react";
import classes from "./Option.module.css";

const option = (props) => (
  <div className={classes.Option}>
    <input
      className={classes.Input}
      type={props.selectType}
      value={props.value}
      id={props.value}
      name="category"
      onChange={props.changed}
    />
    <label className={classes.Label} htmlFor={props.value}>
      {props.value}
    </label>
  </div>
);

export default option;
