import React, { PureComponent, Suspense } from "react";
import classes from "./LMS.module.css";
import Navigation from "../../components/Navigation/Navigation";
import TopBar from "../../components/TopBar/TopBar";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import Layout from "../../hoc/Layout/Layout";
import * as actionCreators from "../../store/actions/index";
import * as actionProfile from "./Profile/store/actions";
import { connect } from "react-redux";
import StudentLectures from "./Lectures/StudentLecture";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Lectures = React.lazy(() => import("./Lectures/Lectures"));
const Messages = React.lazy(() => import("./Messages/Messages"));
const StreamLecture = React.lazy(() => import("./StreamLecture/StreamLecture"));
const Profile = React.lazy(() => import("./Profile/Profile"));
const Setting = React.lazy(() => import("./Setting/Setting"));

class LMS extends PureComponent {
  componentDidMount() {
      // console.log('lms is rendered');
    if (this.props.teacherToken) {
      this.props.getBranches(this.props.teacherToken, "teacher");
      this.props.onProfileLoad(this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.props.getBranches(this.props.studentToken, "student");
      this.props.onProfileLoad(this.props.studentToken, "student");
    }
    // console.log('LMS.js CDM', this.props.branch);
  }

  render() {
    let path;
      const URL = localStorage.getItem("URL");
      // console.log('url [LMS]', URL);
      // console.log('LMS.js',this.props.branch);
    if (this.props.teacherToken) {
      path = "/teacher/";
    } else if (this.props.studentToken) {
      path = "/student/";
    }
    // console.log(this.props.teacherData);
    return (
      <div className={classes.LMS}>
        <TopBar />
        <Navigation />
        {/*<Backdrop/>*/}
        <Layout>
          {/****************************************/}
          <Route
            path={path + "dashboard"}
            exact
            render={() => (
              <Suspense
                fallback={
                  <div>
                    <ProgressBar />
                  </div>
                }
              >
                <Dashboard />
              </Suspense>
            )}
          />

          {this.props.studentToken ? (
            <Switch>
              <Route
                path="/student/lectures"
                exact
                render={() => (
                  <Suspense
                    fallback={
                      <div>
                        <ProgressBar />
                      </div>
                    }
                  >
                    <StudentLectures />
                  </Suspense>
                )}
              />
              <Route
                path="/student/lectures/"
                render={() => (
                  <Suspense
                    fallback={
                      <div>
                        <ProgressBar />
                      </div>
                    }
                  >
                    <Lectures />
                  </Suspense>
                )}
              />
            </Switch>
          ) : (
            <Route
              path="/teacher/lectures"
              render={() => (
                <Suspense
                  fallback={
                    <div>
                      <ProgressBar />
                    </div>
                  }
                >
                  <Lectures />
                </Suspense>
              )}
            />
          )}

          <Route
            path={path + "watch/:id"}
            render={() => (
              <Suspense fallback={<ProgressBar />}>
                <StreamLecture />
              </Suspense>
            )}
          />
          <Route
            path={path + "messages"}
           
            render={() => (
              <Suspense
                fallback={
                  <div>
                    <ProgressBar />
                  </div>
                }
              >
                <Messages />
              </Suspense>
            )}
          />
          <Route
            path={path + "stream"}
            render={() => (
              <Suspense
                fallback={
                  <div>
                    <ProgressBar />
                  </div>
                }
              >
                <StreamLecture />
              </Suspense>
            )}
          />
          <Route
            path={path + "profile"}
            render={() => (
              <Suspense
                fallback={
                  <div>
                    <ProgressBar />
                  </div>
                }
              >
                <Profile />
              </Suspense>
            )}
          />
          <Route
            path={path + "setting"}
            render={() => (
              <Suspense
                fallback={
                  <div>
                    <ProgressBar />
                  </div>
                }
              >
                <Setting />
              </Suspense>
            )}
          />
          <Switch>
              {/*{URL ? <Redirect to={URL} /> : null }*/}
            <Redirect
              from="/teacher/lectures"
              exact
              to="/teacher/lectures/videos"
            />
            <Redirect from={path + "messages"} to={path + "messages/empty"} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
    branch: state.profile.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBranches: (token, url) => {
      dispatch(actionCreators.getBranches(token, url));
    },
    onProfileLoad: (token, url) => {
      dispatch(actionProfile.loadProfile(token, url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LMS);
