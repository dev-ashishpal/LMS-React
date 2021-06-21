import React from "react";
import classes from "./Comment.module.css";

const comment = (props) => (
  <article className={classes.UsersComment}>
    <figure className={classes.UsersCommentImg}>
      <img src={props.userImage} alt="user_image" />
    </figure>
    <div className={classes.UsersCommentDetail}>
      <div className={classes.UsersCommentHeading}>
        <h4>{props.userName}</h4>
        <span>{props.date}</span>
      </div>
      <div className={classes.UsersCommentPara}>
        <p>
          {props.children}
        </p>
      </div>
    </div>
  </article>
);

export default comment;
