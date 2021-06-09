import React from "react";
import classes from "../Lecture.module.css";
import img from "../../../assets/images/notes.png";
import SkeletonElement from "../../UI/skeletonElements/skeletonElement";

const skeletonLecture = () => {
  const skeletonClass = [classes.VideoLecture, classes.SkeletonLecture];
  return (
    <article className={skeletonClass.join(" ")}>
      <div className={classes.ImageContainer}>
        <a href="#">
          {/*<img src={img} alt="thumbnail" />*/}
          <SkeletonElement type="img" />
        </a>
      </div>
      <div>
        <h3 className={classes.VideoLectureHeading}>
          <SkeletonElement type="text" />
        </h3>
        <div className={classes.VideoLecturePara}>
          <a href="#">
            <SkeletonElement type="span" />
          </a>
          <span>
            <SkeletonElement type="span" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default skeletonLecture;
