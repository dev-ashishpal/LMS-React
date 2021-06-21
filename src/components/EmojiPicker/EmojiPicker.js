import React from "react";
import classes from './EmojiPicker.module.css'
import { emojis } from "../../util/emoji";

const emojiPicker = (props) => {
  return (
    <div className={classes.EmojiContainer}>
      {emojis.map((emoji, idx) => {
        return (
          <article
            onClick={props.onClick}
            key={idx}
            className={classes.EmojiSingle}
          >
            {emoji.emoji}
          </article>
        );
      })}
    </div>
  );
};

export default emojiPicker;