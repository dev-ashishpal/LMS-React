import sprite from "../../assets/svg/sprite.svg";
import React from "react";
import classes from "./ChatForm.module.css";
import Input from "../UI/ProfileInput/ProfileInput";
import { isPropertySignature } from "typescript";

const chatForm = (props) => (
  <form onSubmit={props.onSubmit} className={classes.ChatForm}>
    <svg onClick={props.giphy} className={classes.GifIcon}>
      <use href={sprite + "#icon-file-gif"}></use>
    </svg>
    <div className={classes.ImgInput}>
      <svg className={classes.ImgIcon}>
        <use href={sprite + "#icon-camera_enhance"}></use>
      </svg>
      <input type="file" onChange={props.img} />
    </div>
    <Input
      elementType="input"
      elementConfig={{
        type: "text",
        placeholder: "Write the Message...",
      }}
      value={props.value}
      changed={props.onChange}
    />

    <svg onClick={props.emoji} className={classes.HappyIcon}>
      <use href={sprite + "#icon-emoji-happy"}></use>
    </svg>
    <button type="submit">
      <svg className={classes.SendIcon}>
        <use href={sprite + "#icon-paper-plane"}></use>
      </svg>
    </button>
  </form>
);

export default chatForm;
