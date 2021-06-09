import React from "react";
import LMS from "./containers/LMS/LMS";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import Homepage from "./containers/Homepage/Homepage";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
// import * as actionProfile from "./containers/LMS/Profile/store/actions";
// import PageNotFound from "./components/404/404";

class App extends React.Component {
  
  componentDidMount() {
    // Initializing Selected Theme from LocalStorage
    const theme = localStorage.getItem('theme');
    document.body.classList.add(theme);

    this.props.onTryLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.teacherToken) {
      routes = (
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/teacher" component={LMS} />
        </Switch>
      );
    }
    if (this.props.studentToken) {
      routes = (
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/student" component={LMS} />
        </Switch>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryLogin: () => {
      dispatch(actionCreators.authCheckState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);