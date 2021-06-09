import image from "../../../assets/images/user1.jpg";
import React, { Fragment } from "react";
import classes from "./MessageLog.module.css";

const messageLog = (props) => {
  // const user1 = [classes.ChatUser, classes.ChatUser1];
  // const user2 = [classes.ChatUser, classes.ChatUser2];
  return (
    <Fragment>
      <div className={classes.ChatUser1}>
        <img src={image} alt="user_image" />
        <p className={classes.ChatBox}>
          <span>Ashish</span>
          <span>
            this is user 1, this is the person who is sending....message.
          </span>
          <span>11:00</span>
        </p>
      </div>

      <div className={classes.ChatUser2}>
        <img src={image} alt="user_image" />
        <p className={classes.ChatBox}>
          <span>Someone</span>
          <span>
            this is user 2, this is the person who is receiving message.
          </span>
          <span>11:00</span>
        </p>
      </div>

        <div className={classes.ChatUser1}>
            <img src={image} alt="user_image" />
            <p className={classes.ChatBox}>
                <span>Ashish</span>
                <span>
            this is user 1, this is the person who is sending....message.
          </span>
                <span>11:00</span>
            </p>
        </div>

        <div className={classes.ChatUser2}>
            <img src={image} alt="user_image" />
            <p className={classes.ChatBox}>
                <span>Someone</span>
                <span>
            this is user 2, this is the person who is receiving message.
          </span>
                <span>11:00</span>
            </p>
        </div>

        <div className={classes.ChatUser1}>
            <img src={image} alt="user_image" />
            <p className={classes.ChatBox}>
                <span>Ashish</span>
                <span>
            this is user 1, this is the person who is sending....message.
          </span>
                <span>11:00</span>
            </p>
        </div>

        <div className={classes.ChatUser2}>
            <img src={image} alt="user_image" />
            <p className={classes.ChatBox}>
                <span>Someone</span>
                <span>
            this is user 2, this is the person who is receiving message.
          </span>
                <span>11:00</span>
            </p>
        </div>
    </Fragment>
  );
};

export default messageLog;
