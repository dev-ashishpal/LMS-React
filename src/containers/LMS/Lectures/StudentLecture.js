import React, { Fragment, PureComponent } from "react";
import classes from "./Lectures.module.css";
import { connect } from "react-redux";
import StudentLectureNavigation from "../../../components/LectureNavigation/StudentLectureNavigation";
import * as actionCreators from "../../../store/actions/lecture";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../components/Lecture/Lecture";
import { userAgent } from "../../../util/userAgent";
import ErrorModal from "../../../components/UI/ErrorModal/ErrorModal";

class StudentLectures extends PureComponent {
  componentDidMount() {
    localStorage.setItem("URL", window.location.pathname);
    this.props.onLoad(this.props.studentToken);
  }

  render() {
    let localhost = "localhost";
    const { error, studentToken, branches } = this.props;

    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    let subjects = [];
    let lectures = [];
    const data = { ...this.props.data };
    for (let key in data) {
      subjects.push(key);
      data[key].forEach((lecture) => {
        lectures.push(lecture);
      });
    }

    const videoLecturesClass = [
      classes.LectureContainer,
      classes.StudentLectureContainer,
    ];

    return (
      <Fragment>
        {error ? (
          <ErrorModal error>Lectures not Fetched. Reload Page!</ErrorModal>
        ) : null}
        <StudentLectureNavigation branches={branches}>
          All Lectures
        </StudentLectureNavigation>
        <main className={videoLecturesClass.join(" ")}>
          <section>
            <SearchBar />

            {subjects.map((subject) => {
              const lecture = lectures.filter((lec) => lec.subject === subject);
              return (
                <div key={subject}>
                  <h1 className={classes.StudentLectureHeading}>{subject}</h1>
                  <div className={classes.VideoLecturesDiv}>
                    {lecture.map((lec) => (
                      <Lecture
                        src={lec.video}
                        img={"http://" + localhost + ":8080/" + lec.image}
                        title={lec.title}
                        key={lec._id}
                        isVideo={true}
                        date={lec.date}
                        subject={studentToken ? lec.subject : null}
                        link={"/student/watch?v=" + lec._id}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branches: state.lec.branches,
    studentToken: state.auth.studentToken,
    data: state.lec.data,
    error: state.lec.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (token) => {
      dispatch(actionCreators.studentVideos(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentLectures);
