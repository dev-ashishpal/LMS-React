import React, { Suspense, Fragment, PureComponent } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import ProgressBar from "./components/UI/ProgressBar/ProgressBar";

const Homepage = React.lazy(() => import("./containers/Homepage/Homepage"));
const LMS = React.lazy(() => import("./containers/LMS/LMS"));

class App extends PureComponent {
  componentDidMount() {
    // Initializing Selected Theme from LocalStorage
    const theme = localStorage.getItem("theme");
    document.body.classList.add(theme);
    this.props.onTryLogin();
  }

  render() {
    const { teacherToken, studentToken } = this.props;
    // const URL = localStorage.getItem("URL");
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Suspense fallback={<ProgressBar />}>
              <Homepage />
            </Suspense>
          )}
        />
        <Redirect to="/" />
      </Switch>
    );

    if (teacherToken) {
      routes = (
        <Fragment>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <Homepage />
                </Suspense>
              )}
            />

            <Route
              path="/teacher"
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <LMS />
                </Suspense>
              )}
            />
          </Switch>
        </Fragment>
      );
    }
    if (studentToken) {
      routes = (
        <Fragment>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <Homepage />
                </Suspense>
              )}
            />
            <Route
              path="/student"
              render={() => (
                <Suspense fallback={<ProgressBar />}>
                  <LMS />
                </Suspense>
              )}
            />
          </Switch>
        </Fragment>
      );
    }
    return (
      <BrowserRouter>
        <div>{routes}</div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentToken: state.auth.studentToken,
    teacherToken: state.auth.teacherToken,
    branch: state.profile.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryLogin: () => {
      dispatch(actionCreators.authCheckState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
