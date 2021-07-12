import React, {PureComponent} from "react";
import classes from "./Dashboard.module.css";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import DonutGraph from "../../../components/Graphs/DonutGraph/DonutGraph";
import BarGraph from "../../../components/Graphs/BarGraph/BarGraph";

class Dashboard extends PureComponent {
  componentDidMount() {
    const {teacherToken, studentToken} = this.props;
    // localStorage.setItem("URL", window.location.pathname);
    if (teacherToken) {
      this.props.onLoad(teacherToken, "teacher");
      this.props.onLoadVideo(teacherToken, "teacher");
      this.props.onLoadNotes(teacherToken, "teacher");
      this.props.onLoadPaper(teacherToken, "teacher");
      this.props.onStudents(teacherToken, "teacher");
    } else if (studentToken) {
      this.props.onLoad(studentToken, "student");
      this.props.onLoadVideo(studentToken, "student");
      this.props.onLoadNotes(studentToken, "student");
      this.props.onLoadPaper(studentToken, "student");
      // this.props.onStudents(this.props.studentToken, "student");
    }
  }

  render() {
    const studentsData = this.props.studentsData;
    const videoData = { ...this.props.videoData };
    const paperData = { ...this.props.paperData };
    const notesData = { ...this.props.notesData };

    // BOXES
    let boxes = <Spinner />;
    if (this.props.data) {
      boxes = this.props.data.map((dt) => (
        <div className={classes.Box} key={dt.name}>
          <h1>{dt.count}</h1>
          <span>{dt.name}</span>
        </div>
      ));
    }
    if (this.props.error) {
      boxes = <div className={classes.Error}>Error occurred!</div>;
    }

    // VIDEO DATA
    let videoBox = <Spinner />;
    if (videoData) {
      videoBox = <DonutGraph data={videoData} />;
    }
    if (this.props.videoError) {
      videoBox = <div className={classes.Error}>Error occurred!</div>;
    }

    // NOTES DATA
    let notesBox = <Spinner />;
    if (notesData) {
      notesBox = <DonutGraph data={notesData} />;
    }
    if (this.props.notesError) {
      notesBox = <div className={classes.Error}>Error occurred!</div>;
    }

    // PAPER DATA
    let paperBox = <Spinner />;
    if (paperData) {
      paperBox = <DonutGraph data={paperData} />;
    }
    if (this.props.paperError) {
      paperBox = <div className={classes.Error}>Error occurred!</div>;
    }

    // STUDENTS DATA
    let studentsBox = <Spinner />;
    if (studentsData) {
      studentsBox = <BarGraph data={studentsData} />;
    }
    if (this.props.studentsError) {
      studentsBox = <div className={classes.Error}>Error occurred!</div>;
    }

    return (
      <div className={classes.Dashboard}>
        <div className={classes.Boxes}>{boxes}</div>

        <div className={classes.Chart}>
          <div className={classes.BarChart}>
            <p>Total Students</p>
            {studentsBox}
          </div>
          <div className={classes.DonutChart}>
            <div className={classes.DonutChartSingle}>
              <p>Videos</p>
              {videoBox}
            </div>
            <div className={classes.DonutChartSingle}>
              <p>Notes</p>
              {notesBox}
            </div>
            <div className={classes.DonutChartSingle}>
              <p>Papers</p>
              {paperBox}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
    branch: state.profile.data,
    data: state.dashboard.data,
    error: state.dashboard.error,
    videoData: state.dashboard.videoData,
    videoError: state.dashboard.videoError,
    paperData: state.dashboard.paperData,
    paperError: state.dashboard.paperError,
    notesData: state.dashboard.notesData,
    notesError: state.dashboard.notesError,
    studentsData: state.dashboard.studentsData,
    studentsError: state.dashboard.studentsError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (token, url) => {
      dispatch(actionCreators.dashboardData(token, url));
    },
    onLoadVideo: (token, url) => {
      dispatch(actionCreators.dashboardVideoData(token, url));
    },
    onLoadNotes: (token, url) => {
      dispatch(actionCreators.dashboardNotesData(token, url));
    },
    onLoadPaper: (token, url) => {
      dispatch(actionCreators.dashboardPaperData(token, url));
    },
    onNotification: (branch, token) => {
      dispatch(actionCreators.dashboardNotification(branch, token));
    },
    onStudents: (token, url) => {
      dispatch(actionCreators.dashboardStudents(token, url));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
