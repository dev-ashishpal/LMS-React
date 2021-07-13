import React from "react";
import classes from "./LectureNavigation.module.css";
import LectureNavigationItem from "./LectureNavigationItem/LectureNavigationItem";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const lectureNavigation = (props) => {
  let navigation;
  if (props.teacherToken) {
    navigation = (
      <nav className={classes.LectureNavigation}>
        <header className={classes.HiddenElement}>
          <h1>Lecture Navigation (Video/Notes/Papers)</h1>
        </header>
        <LectureNavigationItem link={"/teacher/lectures/videos"}>
          Video Lecture
        </LectureNavigationItem>
        <LectureNavigationItem link={"/teacher/lectures/notes"}>
          Notes
        </LectureNavigationItem>
        <LectureNavigationItem link={"/teacher/lectures/papers"}>
          Prev Papers
        </LectureNavigationItem>
      </nav>
    );
  } else if (props.studentToken) {
    navigation = (
      <nav className={classes.LectureNavigation}>
        <header className={classes.HiddenElement}>
          <h1>Lecture Navigation (Video/Notes/Papers)</h1>
        </header>
        <LectureNavigationItem
          link={"/student/lectures/videos" + props.location.search}
        >
          Video Lecture
        </LectureNavigationItem>
        <LectureNavigationItem
          link={"/student/lectures/notes" + props.location.search}
        >
          Notes
        </LectureNavigationItem>
        <LectureNavigationItem
          link={"/student/lectures/papers" + props.location.search}
        >
          Prev Papers
        </LectureNavigationItem>
      </nav>
    );
  }

  return (
    <aside className={classes.LectureSidebar}>
      <div>
        <h2 className={classes.LectureSidebarHeading}>{props.children}</h2>
        {navigation}
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

export default connect(mapStateToProps)(withRouter(lectureNavigation));
