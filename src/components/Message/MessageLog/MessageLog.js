import React from "react";
import classes from "./MessageLog.module.css";
import { gifGenerator } from "../../../util/linkGenerator";
import userImage from '../../../assets/images/user.png'
import { userAgent } from "../../../util/userAgent";

const messageLog = (props) => {
  let localhost = "localhost";
  if (userAgent()) {
    localhost = "192.168.43.135";
  }
  // const user1 = [classes.ChatUser, classes.ChatUser1];
  // const user2 = [classes.ChatUser, classes.ChatUser2];
  let userClass = classes.ChatUser2;
  if (props.your) {
    userClass = classes.ChatUser1;
  }
  return (
    <div className={userClass} ref={props.messageLogRef}>
      <img
        src={props.image ? "http://" + localhost + ":8080/" + props.image : userImage}
        alt="user_image"
      />
      <p className={classes.ChatBox}>
        <span>{props.username}</span>
        <span
          dangerouslySetInnerHTML={{
            __html: gifGenerator(props.children),
          }}
        ></span>
        <span>{props.date}</span>
      </p>
    </div>
  );
};

export default messageLog;
