import React from "react";
import classes from "./Lecture.module.css";
import sprite from "../../assets/svg/sprite.svg";
import { Link } from "react-router-dom";
import { timeSince } from "../../util/timeSince";
import { connect } from "react-redux";

const lecture = (props) => {
  // const date = timeSince(props.date);
  const iconClass = [classes.IconContainer, classes.IconEdit];
  let editIcon = (
    <div className={iconClass.join(" ")}>
      <button onClick={props.editHandler}>
        <svg>
          <use href={sprite + "#icon-create"}></use>
        </svg>
      </button>
    </div>
  );
  let deleteIcon = (
    <button
      title="Delete Lecture"
      className={classes.IconBtn}
      type="button"
      onClick={props.deleteHandler}
    >
      <svg>
        <use href={sprite + "#icon-delete"}></use>
      </svg>
    </button>
  );
  if (props.studentToken) {
    if(props.addedToWl) {
      deleteIcon = (<button
          title="Remove From WatchList"
          className={classes.IconBtn}
          type="button"
          onClick={props.removeFromWlHandler}
      >
        <svg>
          <use href={sprite + "#icon-favorite"}></use>
        </svg>
      </button>);
    } else {
    deleteIcon = (<button
        title="Add to WatchList"
        className={classes.IconBtn}
        type="button"
        onClick={props.addToWlHandler}
    >
      <svg>
        <use href={sprite + "#icon-favorite_outline"}></use>
      </svg>
    </button>);
    }

  }
  if (!props.isVideo || props.studentToken) {
    editIcon = null;
  }
  return (
    <article className={classes.VideoLecture}>
      <div className={classes.ImageContainer}>
        {props.isVideo ? (
          <Link to={props.link}>
            <img src={props.img} alt="thumbnail" />
          </Link>
        ) : (
          <a href={props.link} target="_blank" download="true">
            <img src={props.img} alt="thumbnail" />
          </a>
        )}
        <div className={classes.IconContainer}>{deleteIcon}</div>
        {editIcon}
      </div>
      <div>
        <h3 className={classes.VideoLectureHeading}>{props.title}</h3>
        <p className={classes.VideoLecturePara}>
          <a href="#">{props.name}</a>
          <span>{timeSince(props.date)}</span>
        </p>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

export default connect(mapStateToProps)(lecture);
