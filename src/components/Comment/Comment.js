import React from "react";
import classes from "./Comment.module.css";
import sprite from "../../assets/svg/sprite.svg";

const comment = (props) => (
  <div className={classes.UsersComment}>
    <figure className={classes.UsersCommentImg}>
      <img src={props.userImage} alt="user_image" />
    </figure>
    <div className={classes.UsersCommentDetail}>
      <div className={classes.UsersCommentHeader}>
        <p className={classes.UsersCommentHeading}>{props.userName}</p>
        <span>{props.date}</span>
      </div>
      <div className={classes.UsersCommentPara}>
        <p>{props.children}</p>
      </div>
    </div>
    {props.isAdmin ? (
      <svg onClick={props.deleteBtn}>
        <use href={sprite + "#icon-dots-three-horizontal"}></use>
      </svg>
    ) : null}
  </div>
);

export default comment;
