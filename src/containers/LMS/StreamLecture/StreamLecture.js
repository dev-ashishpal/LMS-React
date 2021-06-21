import React, { Component } from "react";
import classes from "./StreamLecture.module.css";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import sprite from "../../../assets/svg/sprite.svg";
import userImg from "../../../assets/images/user.jpg";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import { timeSince } from "../../../util/timeSince";
import { required } from "../../../util/validators";
import { linkGenerator } from "../../../util/linkGenerator";
import Comment from "../../../components/Comment/Comment";
import TextInput from "../../../components/UI/Input/TextInput/TextInput";
import openSocket from "socket.io-client";
import { userAgent } from "../../../util/userAgent";

class StreamLecture extends Component {
  state = {
    isPlaying: false,
    comment: {
      msg: "",
      valid: false,
      touched: false,
      required,
    },
    commentData: [],
    formIsValid: true,
  };

  componentDidMount() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }
    localStorage.setItem("URL", window.location.pathname);
    const _id = this.props.match.params.id;

    if (this.props.teacherToken) {
      this.props.onLoad(_id, this.props.teacherToken, "teacher");
      this.getComments(localhost, this.props.teacherToken, "teacher", _id);
    } else if (this.props.studentToken) {
      this.props.onLoad(_id, this.props.studentToken, "student");
      this.getComments(localhost, this.props.studentToken, "student", _id);
    }

    const socket = openSocket(`http://${localhost}:8080`);
    socket.on("comment", (data) => {
      if (data.action === _id) {
        this.addComment(data.comment[0]);
      }
    });
  }

  addComment = (comment) => {
    this.setState((prevState) => {
      const updatedCommentData = [...prevState.commentData];
      updatedCommentData.unshift(comment);
      return { commentData: updatedCommentData };
    });
  };

  getComments = (localhost, token, url, videoId) => {
    fetch(`http://${localhost}:8080/${url}/lecture/video/comment/${videoId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        const commentData = resData.data.reverse();
        this.setState({ commentData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevState.comment.valid) {
  //     this.setState((prevState) => {
  //       return {formIsValid: !prevState.formIsValid };
  //     });
  //   } else {
  //     this.setState((prevState) => {
  //       return { formIsValid: !prevState.formIsValid };
  //     });
  //   }
  // }
  commentChangeHandler = (e) => {
    const cmtElem = { ...this.state.comment };
    cmtElem.msg = e.target.value;
    cmtElem.touched = true;
    cmtElem.valid = cmtElem.required(e.target.value);
    this.setState({ comment: cmtElem });
  };

  submitCommentHandler = (e) => {
    e.preventDefault();
    const commentData = {
      msg: this.state.comment.msg,
      userId: this.props.userData._id,
    };
    if (this.props.teacherToken) {
      this.props.onPostComment(
        this.props.teacherToken,
        "teacher",
        this.props.data._id,
        commentData
      );
    } else if (this.props.studentToken) {
      this.props.onPostComment(
        this.props.studentToken,
        "student",
        this.props.data._id,
        commentData
      );
    }
    this.emptyInputHandler();
  };

  emptyInputHandler = () => {
    const updatedComment = { ...this.state.comment };
    updatedComment.msg = "";
    this.setState({ comment: updatedComment });
  };

  onLoadingVideo = (_id) => {
    if (this.props.teacherToken) {
      this.getComments(this.props.teacherToken, "teacher", _id);
      return this.props.onLoad(_id, this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.getComments(this.props.studentToken, "student", _id);
      return this.props.onLoad(_id, this.props.studentToken, "student");
    }
  };

  render() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    let streamLink;
    if (this.props.teacherToken) {
      streamLink = "/teacher/watch/";
    } else if (this.props.studentToken) {
      streamLink = "/student/watch/";
    }

    const videoData = { ...this.props.data };
    return (
      <main className={classes.Stream}>
        <section className={classes.StreamContainer}>
          <VideoPlayer src={videoData.video} />
          <div className={classes.StreamContainerDetails}>
            <div className={classes.StreamContainerHeader}>
              <h3>{videoData.title}</h3>
              <span>{timeSince(videoData.date)}</span>
              <span className={classes.StreamContainerIcon}>
                <svg>
                  <use href={sprite + "#icon-dots-three-horizontal"}></use>
                </svg>
              </span>
            </div>

            <div className={classes.StreamContainerDesc}>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${linkGenerator(videoData.description)}`,
                }}
              ></p>
            </div>
            <div className={classes.CommentBox}>
              <h1 className={classes.CommentBoxHeading}>Comments</h1>
              <div className={classes.CommentBoxUser}>
                <figure>
                  <img
                    src={`http://${localhost}:8080/${this.props.userData.image}`}
                    alt="user_image"
                  />
                </figure>
                <form
                  onSubmit={this.submitCommentHandler}
                  className={classes.CommentForm}
                >
                  <label htmlFor="add-comment" hidden>
                    Add New Comment
                  </label>
                  <TextInput
                    label=" "
                    type="text"
                    inputtype="textarea"
                    name="lectureDescription"
                    onChange={this.commentChangeHandler}
                    valid={this.state.comment.valid ? 1 : 0}
                    touched={this.state.comment.touched ? 1 : 0}
                    value={this.state.comment.name}
                  />
                  <div className={classes.CommentFormSubmit}>
                    <button
                      type="submit"
                      disabled={this.state.formIsValid ? false : true}
                    >
                      Publish
                    </button>
                  </div>
                </form>
              </div>

              <div className={classes.UsersCommentContainer}>
                {this.state.commentData.map((cmtData) => (
                  <Comment
                    key={cmtData._id}
                    userName={cmtData.userName}
                    date={timeSince(cmtData.date)}
                    userImage={`http://${localhost}:8080/${cmtData.userImage}`}
                  >
                    {cmtData.msg}
                  </Comment>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className={classes.StreamSidebar}>
          <header className={classes.StreamSidebarHeader}>
            <h1>Similar Lectures</h1>
          </header>
          <main className={classes.StreamSidebarContainer}>
            <ul className={classes.StreamSidebarContainerList}>
              {this.props.sideLecData.map((data) => (
                <li
                  key={data._id}
                  className={
                    data._id === videoData._id
                      ? classes.StreamSidebarContainerItem
                      : null
                  }
                >
                  <Link
                    onClick={() => {
                      this.onLoadingVideo(data._id);
                    }}
                    to={streamLink + data._id}
                    className={classes.StreamSidebarContainerLink}
                  >
                    <figure className={classes.StreamSidebarContainerImg}>
                      <img
                        src={`http://${localhost}:8080/` + data.image}
                        alt="lecture image"
                      />
                    </figure>
                    <div className={classes.StreamSidebarBox}>
                      <h4>{data.title}</h4>
                      <span>{data.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </main>
        </aside>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.stream.data,
    error: state.stream.error,
    teacherToken: state.auth.teacherToken,
    loading: state.stream.loading,
    sideLecData: state.videoLec.data,
    userData: state.profile.data,
    studentToken: state.auth.studentToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (_id, token, url) => {
      dispatch(actionCreators.loadVideo(_id, token, url));
    },
    onPostComment: (token, url, videoId, commentData) => {
      dispatch(actionCreators.postComment(token, url, videoId, commentData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StreamLecture));
