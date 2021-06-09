import React from "react";
import classes from "./LectureAddBtn.module.css";
// import sprite from "../../assets/svg/sprite.svg";
import img from "../../assets/images/plus.svg";
const lectureAddBtn = (props) => {

  return (
    <div className={classes.LectureAddBtn} onClick={props.clicked}>
      <figure>
        <img src={img} alt="addBtn" />
      </figure>
    </div>
  );
};

export default lectureAddBtn;
