import React, { Component, Fragment } from "react";
import sprite from "../../../assets/svg/sprite.svg";
import classes from "./Messages.module.css";
import ChatList from "../../../components/ChatList/ChatList";
import Message from "../../../components/Message/Message";
import ChatForm from "../../../components/ChatForm/ChatForm";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";

class Messages extends Component {
  componentDidMount() {
    if (this.props.teacherToken) {
      this.props.initBranches(this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.props.initBranches(this.props.studentToken, "student");
    }
  }

  render() {
    // console.log(this.props.branches);
    return (
      <Fragment>
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
              <ChatList key={branch}>{branch}</ChatList>
            ))}
          </section>
        </aside>
        {/*************** Main Message *****************/}
        <main className={classes.Main}>
          <section>
            <div className={classes.MainContainer}>
              <Message />
              <ChatForm />
            </div>
          </section>
        </main>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
