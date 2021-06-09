import React, { Suspense } from "react";
import classes from "./Lectures.module.css";
import { connect } from "react-redux";
import StudentLectureNavigation from "../../../components/LectureNavigation/StudentLectureNavigation";
import * as actionCreators from "../../../store/actions/lecture";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../components/Lecture/Lecture";
class StudentLectures extends React.PureComponent {
  componentDidMount() {
    this.props.onLoad(this.props.studentToken);
  }

  render() {
    let subjects = [];
    let lectures = [];
    const data = { ...this.props.data };
    console.log(data);
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
      <React.Fragment>
        <StudentLectureNavigation branches={this.props.branches}>
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
                        img={"http://localhost:8080/" + lec.image}
                        title={lec.title}
                        key={lec._id}
                        isVideo={true}
                        date={lec.date}
                        name={lec.subject}
                        link={"/student/watch/" + lec._id}
                        addedToWl={this.props.addedToWl}
                        addToWlHandler={() => {
                          this.addToWlHandler(lec._id);
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branches: state.lec.branches,
    studentToken: state.auth.studentToken,
    data: state.lec.data,
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
