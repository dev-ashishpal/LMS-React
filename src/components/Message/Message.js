import React, { Fragment } from "react";
import classes from "./Message.module.css";
import imageBig from "../../assets/images/user.png";
import sprite from "../../assets/svg/sprite.svg";
import MessageLog from "./MessageLog/MessageLog";

const message = () => {
  return (
    <Fragment>
      <header className={classes.Header}>
        <figure className={classes.HeaderImg}>
          <img src={imageBig} alt="user_image" />
        </figure>
        <div className={classes.HeaderHeading}>
          <h4>ashish pal</h4>
          <span>Online</span>
        </div>
        <div className={classes.HeaderIcon}>
          <svg>
            <use href={sprite + "#icon-star"}></use>
          </svg>
          <svg>
            <use href={sprite + "#icon-dots-three-vertical"}></use>
          </svg>
        </div>
      </header>

      <main className={classes.ChatContainer}>
        <div className={classes.ChatLog}>
          <MessageLog />
        </div>
      </main>
    </Fragment>
  );
};

export default message;
