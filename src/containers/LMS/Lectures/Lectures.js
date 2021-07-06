import React, { Suspense } from "react";
import classes from "./Lectures.module.css";
import ProgressBar from "../../../components/UI/ProgressBar/ProgressBar";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LectureNavigation from "../../../components/LectureNavigation/LectureNavigation";

const VideoLectures = React.lazy(() => import("./VideoLectures/VideoLectures"));
const NotesLectures = React.lazy(() => import("./NotesLectures/NotesLectures"));
const PapersLectures = React.lazy(() =>
  import("./PapersLectures/PapersLectures")
);

class Lectures extends React.PureComponent {
  state = {
    show: false,
  };

  openedAddLectureModal = () => {
    this.setState({ show: true });
  };

  closedAddLectureModal = () => {
    this.setState({ show: false });
  };

  render() {
    let path;
    if (this.props.teacherToken) {
      path = "/teacher/";
    } else if (this.props.studentToken) {
      path = "/student/";
    }
    return (
      <React.Fragment>
        <LectureNavigation>
          {this.props.studentToken
            ? this.props.location.search.split("=")[1]
            : "All Lecture"}
        </LectureNavigation>
        <main className={classes.LectureContainer}>
          <section>
            {/*<Switch>*/}
            <Route
              path={path + "lectures/videos"}
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <VideoLectures />
                </Suspense>
              )}
            />

            <Route
              path={path + "lectures/notes"}
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <NotesLectures />
                </Suspense>
              )}
            />
            <Route
              path={path + "lectures/papers"}
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <PapersLectures />
                </Suspense>
              )}
            />
            
            {/*</Switch>*/}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};
export default connect(mapStateToProps)(withRouter(Lectures));
