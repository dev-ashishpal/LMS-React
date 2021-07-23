import React from "react";
import classes from "./Lecture.module.css";
import sprite from "../../assets/svg/sprite.svg";
import { Link } from "react-router-dom";
import { timeSince } from "../../util/timeSince";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const lecture = (props) => {
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
    deleteIcon = null;
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
          <a href={props.link} target="_blank" rel="noreferrer" download="true">
            <img src={props.img} alt="thumbnail" />
          </a>
        )}
        <div className={classes.IconContainer}>{deleteIcon}</div>
        {editIcon}
      </div>
      <div>
        <h3 className={classes.VideoLectureHeading}>{props.title}</h3>
        <p className={classes.VideoLecturePara}>
          <span>{props.subject}</span>
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

lecture.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  show: PropTypes.bool,
  isVideo: PropTypes.bool,
  teacherToken: PropTypes.string,
  studentToken: PropTypes.string,
  link: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  subject: PropTypes.string,
  date: PropTypes.string,

  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
};

export default connect(mapStateToProps)(lecture);
