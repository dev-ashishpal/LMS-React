import React, { Component, Fragment } from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./Messages.module.css";
import ChatList from "../../../components/ChatList/ChatList";
import Empty from "./Empty/Empty";
import ChatBox from "./ChatBox/ChatBox";
import { Route, Switch, withRouter } from "react-router";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";

class Messages extends Component {
  componentDidMount() {
    localStorage.setItem("URL", window.location.pathname);
    if (this.props.teacherToken) {
      this.props.initBranches(this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.props.initBranches(this.props.studentToken, "student");
    }
  }

  render() {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    if (mediaQuery.matches) {
      console.log("yeah its mobile mode");
    }
    let urlParam = window.location.search.split("=")[1]
      ? window.location.search.split("=")[1].replace("%", " ")
      : null;
    let path;
    if (this.props.teacherToken) {
      path = "/teacher/";
    } else if (this.props.studentToken) {
      path = "/student/";
    }
    let sidebar = (
      <aside className={classes.Sidebar}>
        <div className={classes.SearchBar}>
          <input
            type="text"
            className={classes.SearchBarInput}
            placeholder="Search"
            id="messages-search"
          />
          <label htmlFor="messages-search" hidden>
            search box for messages
          </label>
          <svg>
            <use href={sprite + "#icon-search"}></use>
          </svg>
        </div>
        <section className={classes.SidebarContainer}>
          {this.props.branches.map((branch) => (
            <ChatList url={urlParam === branch} link={branch} key={branch}>
              {branch}
            </ChatList>
          ))}
        </section>
      </aside>
    );

    if (mediaQuery.matches && !!urlParam) {
      sidebar = null;
    }
    return (
      <div className={classes.Message}>
        {sidebar}
        {/*************** Main Message *****************/}
        <main className={classes.Main}>
          <section>
            <div className={classes.MainContainer}>
              <Switch>
                <Route
                  path={path + "messages/empty"}
                  render={() => <Empty />}
                />
                <Route
                  key={Math.random()}
                  path={path + "messages/chat"}
                  render={() => {
                    return (
                      <Fragment>
                        <ChatBox />
                      </Fragment>
                    );
                  }}
                />
              </Switch>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branches: state.message.branches,
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initBranches: (token, url) => {
      dispatch(actionCreators.loadBranches(token, url));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
