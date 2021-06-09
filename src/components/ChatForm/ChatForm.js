import sprite from "../../assets/svg/sprite.svg";
import React from "react";
import classes from './ChatForm.module.css';

const chatForm = () => (
    <form className={classes.ChatForm}>
        <svg className={classes.AttachmentIcon}>
            <use href={sprite + "#icon-attachment"}></use>
        </svg>
        <input
            type="text"
            placeholder="Write your message..."
        />

        <svg className={classes.HappyIcon}>
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