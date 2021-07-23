import React, { PureComponent, Fragment } from "react";
import classes from "./Dashboard.module.css";
import * as actionCreators from "./store/actions";
// import * as actionProfileCreators from '../Profile/store/actions';
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import DonutGraph from "../../../components/Graphs/DonutGraph/DonutGraph";
import BarGraph from "../../../components/Graphs/BarGraph/BarGraph";
import PropTypes from "prop-types";

class Dashboard extends PureComponent {
  componentDidMount() {
    const { teacherToken, studentToken } = this.props;
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
      // this.props.onGetProfile(studentToken, "student");
    }
  }

  render() {
    const studentsData = this.props.studentsData;
    const videoData = { ...this.props.videoData };
    const paperData = { ...this.props.paperData };
    const notesData = { ...this.props.notesData };
    let boxes = <Spinner />;
    let videoBox = <Spinner />;
    let notesBox = <Spinner />;
    let paperBox = <Spinner />;
    let studentsBox = <Spinner />;
    let barGraph;

    // BOXES
    if (this.props.data) {
      boxes = this.props.data.map((dt) => (
        <div className={classes.Box} key={dt.name}>
          <header>
            <span>{dt.count}</span>
            <h2>{dt.name}</h2>
          </header>
        </div>
      ));
    }
    if (this.props.error) {
      boxes = <div className={classes.Error}>Error occurred!</div>;
    }

    // VIDEO DATA
    if (videoData) {
      videoBox = <DonutGraph data={videoData} />;
    }
    if (this.props.videoError) {
      videoBox = <div className={classes.Error}>Error occurred!</div>;
    }

    // NOTES DATA
    if (notesData) {
      notesBox = <DonutGraph data={notesData} />;
    }
    if (this.props.notesError) {
      notesBox = <div className={classes.Error}>Error occurred!</div>;
    }

    // PAPER DATA
    if (paperData) {
      paperBox = <DonutGraph data={paperData} />;
    }
    if (this.props.paperError) {
      paperBox = <div className={classes.Error}>Error occurred!</div>;
    }

    // STUDENTS DATA
    if (studentsData) {
      studentsBox = <BarGraph data={studentsData} />;
    }
    if (this.props.studentsError) {
      studentsBox = <div className={classes.Error}>Error occurred!</div>;
    }

    if (this.props.teacherToken) {
      barGraph = (
        <Fragment>
          <p>Total Students</p>
          {studentsBox}
        </Fragment>
      );
    } else if (this.props.studentToken) {
      let user = { ...this.props.userData };
      barGraph = (
        <div className={classes.WelcomeContainer}>
          <span className={classes.Welcome}>Welcome,</span>
          <span className={classes.WelcomeName}>{user.name}</span>
        </div>
      );
    }

    return (
      <div className={classes.Dashboard}>
        <section className={classes.Boxes}>
          <header className={classes.HiddenElement}>
            <h1>Number of lectures Data in Boxes.</h1>
          </header>
          {boxes}
        </section>

        <div className={classes.Chart}>
          <section className={classes.BarChart}>
            <header className={classes.HiddenElement}>
              <h1>Bar Graph of Students</h1>
            </header>
            {barGraph}
          </section>
          <section className={classes.DonutChart}>
            <header className={classes.HiddenElement}>
              <h1>Donut Chart for Lectures on specific Subjects / Branches.</h1>
            </header>
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
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
    userData: state.profile.data,
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
    // onGetProfile: (token, url) => {
    //   dispatch(actionProfileCreators.loadProfile(token, url));
    // },
  };
};

Dashboard.propTypes = {
  teacherToken: PropTypes.string,
  studentToken: PropTypes.string,
  userData: PropTypes.object,
  data: PropTypes.array,
  error: PropTypes.string,
  videoData: PropTypes.array,
  videoError: PropTypes.string,
  paperData: PropTypes.array,
  paperError: PropTypes.string,
  notesData: PropTypes.array,
  notesError: PropTypes.string,
  studentData: PropTypes.array,
  studentError: PropTypes.string,

  onLoad: PropTypes.func,
  onStudents: PropTypes.func,
  onNotification: PropTypes.func,
  onLoadPaper: PropTypes.func,
  onLoadNotes: PropTypes.func,
  onLoadVideo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
