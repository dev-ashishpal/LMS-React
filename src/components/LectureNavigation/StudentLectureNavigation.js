import React from "react";
import classes from "./LectureNavigation.module.css";
import LectureNavigationItem from "./LectureNavigationItem/LectureNavigationItem";
import { connect } from "react-redux";

const studentLectureNavigation = (props) => {
  return (
    <aside className={classes.LectureSidebar}>
      <div>
        <h2 className={classes.LectureSidebarHeading}>{props.children}</h2>
        <nav className={classes.LectureNavigation}>
          {props.branches.map((branch) => (
            <LectureNavigationItem key={branch} link={"/student/lectures/videos?subject=" + branch}>
                {branch}
            </LectureNavigationItem>
          ))}
        </nav>
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

export default connect(mapStateToProps)(studentLectureNavigation);
