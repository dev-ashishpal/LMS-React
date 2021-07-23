import React, { Fragment } from "react";
import classes from "./ErrorModal.module.css";
import PropTypes from "prop-types";

const errorModal = (props) => {
  let error = (
    <div
      className={classes.ErrorModal}
      style={props.error === true ? { color: "#ff6932" } : { color: "#00CED1" }}
    >
      {props.children}
    </div>
  );
  return <Fragment>{error}</Fragment>;
};

errorModal.propTypes = {
  error: PropTypes.string,
};

export default errorModal;
