import React from "react";
import classes from "./Dashboard.module.css";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import LineGraph from "../../../components/Graphs/LineGraph/LineGraph";
import DonutGraph from "../../../components/Graphs/DonutGraph/DonutGraph";

class Dashboard extends React.Component {
  componentDidMount() {
    localStorage.setItem("URL", window.location.pathname);
    if (this.props.teacherToken) {
      this.props.onLoad(this.props.teacherToken, "teacher");
      this.props.onLoadVideo(this.props.teacherToken, "teacher");
      this.props.onLoadNotes(this.props.teacherToken, "teacher");
      this.props.onLoadPaper(this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.props.onLoad(this.props.studentToken, "student");
      this.props.onLoadVideo(this.props.studentToken, "student");
      this.props.onLoadNotes(this.props.studentToken, "student");
      this.props.onLoadPaper(this.props.studentToken, "student");
    }
  }

  render() {
    const videoData = { ...this.props.videoData };
    const paperData = { ...this.props.paperData };
    const notesData = { ...this.props.notesData };
    return (
      <div className={classes.Dashboard}>
        <div className={classes.Boxes}>
          {this.props.data.map((dt) => (
            <div className={classes.Box} key={dt.name}>
              <h1>{dt.count}</h1>
              <span>{dt.name}</span>
            </div>
          ))}
        </div>

        <div className={classes.Chart}>
          <div className={classes.LineChart}>
            <p>Total Lecture Added</p>
            <LineGraph />
          </div>
          <div className={classes.DonutChart}>
            <div className={classes.DonutChartSingle}>
              <p>Videos</p>
              <DonutGraph data={videoData} />
            </div>
            <div className={classes.DonutChartSingle}>
              <p>Notes</p>
              <DonutGraph data={notesData} />
            </div>
            <div className={classes.DonutChartSingle}>
              <p>Papers</p>
              <DonutGraph data={paperData} />
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
    data: state.dashboard.data,
    videoData: state.dashboard.videoData,
    paperData: state.dashboard.paperData,
    notesData: state.dashboard.notesData,
    branch: state.profile.data,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
