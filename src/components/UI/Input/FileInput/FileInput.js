import React from "react";
import classes from "./FileInput.module.css";
import sprite from "../../../../assets/svg/sprite.svg";
import img from "../../../../assets/images/maths3.jpg";

const fileInput = (props) => {
  let preview;
  switch (props.inputtype) {
    case "image":
      preview = <img src={props.src} alt={props.alt} />;
      break;
    case "video":
      preview = <video src={props.src} autoPlay muted />;
      break;
    default:
      preview = null;
  }
  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      <p className={classes.SubText}>{props.subtext}</p>
      <div className={classes.InputContainer}>
        <div className={classes.InputBox}>
          <input
            type={props.type}
            name={props.label}
            onChange={props.changed}
            accept={props.accept}
          />
          <svg className={classes.InputIcon}>
            <use href={sprite + props.icon}></use>
          </svg>
        </div>

        {props.preview ? (
          <figure className={classes.InputPreview}>{preview}</figure>
        ) : null}
      </div>
    </div>
  );
};

export default fileInput;
