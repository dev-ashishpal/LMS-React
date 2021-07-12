import React, { PureComponent, Fragment } from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./Messages.module.css";
import ChatList from "../../../components/ChatList/ChatList";
import Empty from "./Empty/Empty";
import ChatBox from "./ChatBox/ChatBox";
import { Route, Switch, withRouter } from "react-router";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import { search } from "../../../util/search";

class Messages extends PureComponent {
  constructor(props) {
    super(props);
    this.chatListRef = React.createRef();
  }
  componentDidMount() {
    const { teacherToken, studentToken } = this.props;
    localStorage.setItem("URL", window.location.pathname);
    if (teacherToken) {
      this.props.initBranches(teacherToken, "teacher");
    } else if (studentToken) {
      this.props.initBranches(studentToken, "student");
    }
  }

  render() {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    let path;
    let urlParam = window.location.search.split("=")[1]
      ? window.location.search.split("=")[1].replace("%", " ")
      : null;

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
            onChange={(e) => {
              search(e, this.chatListRef);
            }}
            id="messages-search"
          />
          <label htmlFor="messages-search" hidden>
            search box for messages
          </label>
          <svg>
            <use href={sprite + "#icon-search"}></use>
          </svg>
        </div>
        <section ref={this.chatListRef} className={classes.SidebarContainer}>
          {this.props.branches.map((branch) => {
            return (
              <ChatList link={branch} key={branch}>
                {branch}
              </ChatList>
            );
          })}
        </section>
      </aside>
    );

    if (mediaQuery.matches && !!urlParam) {
      sidebar = null;
    }
    return (
      <div className={classes.Message}>
        {sidebar}
        <main className={classes.Main}>
          <section>
            <div className={classes.MainContainer}>
              <Switch>
                <Route
                  path={path + "messages/empty"}
                  render={() => <Empty />}
                />
                <Route
                  key={window.location.search}
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
    newMessage: state.message.newMessage,
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
