import React from "react";
import classes from "./Backdrop.module.css";
import PropTypes from "prop-types";

const backdrop = (props) =>
  props.show ? (
    <div onClick={props.clicked} className={classes.Backdrop}></div>
  ) : null;

backdrop.propTypes = {
  show: PropTypes.bool,

  clicked: PropTypes.func,
};

export default backdrop;
