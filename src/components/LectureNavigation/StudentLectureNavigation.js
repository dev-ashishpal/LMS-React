import React from "react";
import classes from "./LectureNavigation.module.css";
import LectureNavigationItem from "./LectureNavigationItem/LectureNavigationItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const studentLectureNavigation = (props) => {
  return (
    <aside className={classes.LectureSidebar}>
      <header className={classes.HiddenElement}>
        <h1>Lecture Sidebar</h1>
      </header>
      <div>
        <p className={classes.LectureSidebarHeading}>{props.children}</p>
        <nav className={classes.LectureNavigation}>
          <header className={classes.HiddenElement}>
            <h1>Lecture Sidebar Navigation List</h1>
          </header>
          {props.branches.map((branch) => (
            <LectureNavigationItem
              key={branch}
              link={"/student/lectures/videos?subject=" + branch}
            >
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

studentLectureNavigation.propTypes = {
  branches: PropTypes.array,
  studentToken: PropTypes.string,
  teacherToken: PropTypes.string,
};

export default connect(mapStateToProps)(studentLectureNavigation);
