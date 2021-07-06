import React, { Suspense, Fragment } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import reportWebVitals from "./reportWebVitals";
import ProgressBar from "./components/UI/ProgressBar/ProgressBar";

const Homepage = React.lazy(() => import("./containers/Homepage/Homepage"));
const LMS = React.lazy(() => import("./containers/LMS/LMS"));

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    // Initializing Selected Theme from LocalStorage
    const theme = localStorage.getItem("theme");
    document.body.classList.add(theme);
    this.props.onTryLogin();
  }

  render() {

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

    if (this.props.teacherToken) {
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
          {/*{!!URL ? <Redirect to={URL} /> : null}*/}
        </Fragment>
      );
    }
    if (this.props.studentToken) {
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
          {/*{!!URL ? <Redirect to={URL} /> : null}*/}
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

// reportWebVitals(console.log)

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
