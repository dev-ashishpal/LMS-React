import React from "react";
import classes from "./LectureAddBtn.module.css";
import img from "../../assets/images/plus.svg";
import PropTypes from "prop-types";
const lectureAddBtn = (props) => {
  return (
    <div className={classes.LectureAddBtn} onClick={props.clicked}>
      <figure>
        <img src={img} alt="addBtn" />
      </figure>
    </div>
  );
};

lectureAddBtn.propTypes = {
  clicked: PropTypes.func,
};

export default lectureAddBtn;
