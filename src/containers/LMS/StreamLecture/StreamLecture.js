import React, { PureComponent } from "react";
import classes from "./StreamLecture.module.css";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import sprite from "../../../assets/svg/sprite.svg";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionCreators from "./store/actions";
import * as actionCreatorsVideo from "../Lectures/VideoLectures/store/actions";
import { timeSince } from "../../../util/timeSince";
import { required } from "../../../util/validators";
import { parseMarkdown } from "../../../util/linkGenerator";
import Comment from "../../../components/Comment/Comment";
import TextInput from "../../../components/UI/Input/TextInput/TextInput";
import openSocket from "socket.io-client";
import { userAgent } from "../../../util/userAgent";
import MenuDropdown from "../../../components/UI/MenuDropdown/MenuDropdown";
import { positionMenuDropdown } from "../../../util/menuDropdown";
import ErrorModal from "../../../components/UI/ErrorModal/ErrorModal";

class StreamLecture extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteDropdownRef = React.createRef();
  }

  state = {
    isPlaying: false,
    comment: {
      msg: "",
      valid: false,
      touched: false,
      required,
    },
    commentId: null,
    formIsValid: false,
    showDelete: false,
  };

  componentDidMount() {
    const { teacherToken, studentToken, location } = this.props;
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }
    // localStorage.setItem("URL", window.location.pathname);
    const _id = location.search.split("=")[1];
    if (teacherToken) {
      // this.props.onLoadLecture(teacherToken, "/teacher/lecture/video");
      this.props.onLoad(_id, teacherToken, "teacher");
      this.props.onLoadComment(localhost, teacherToken, "teacher", _id);
    } else if (studentToken) {
      // this.props.onLoadLecture(teacherToken, "/teacher/lecture/video");
      this.props.onLoad(_id, studentToken, "student");
      this.props.onLoadComment(localhost, studentToken, "student", _id);
    }

    const socket = openSocket(`http://${localhost}:8080`);
    socket.on("comment", (data) => {
      if (data.action === _id) {
        this.props.onAddComment(data.comment[0]);
      }
    });
  }

  commentChangeHandler = (e) => {
    const cmtElem = { ...this.state.comment };
    cmtElem.msg = e.target.value;
    cmtElem.touched = true;
    cmtElem.valid = cmtElem.required(e.target.value);
    this.setState({ comment: cmtElem, formIsValid: cmtElem.valid });
  };

  submitCommentHandler = (e) => {
    e.preventDefault();
    const { teacherToken, studentToken, data, userData } = this.props;
    const { comment } = this.state;

    const commentData = {
      msg: comment.msg,
      userId: userData._id,
    };
    if (teacherToken) {
      this.props.onPostComment(teacherToken, "teacher", data._id, commentData);
    } else if (studentToken) {
      this.props.onPostComment(studentToken, "student", data._id, commentData);
    }
    this.emptyInputHandler();
  };

  emptyInputHandler = () => {
    const updatedComment = { ...this.state.comment };
    updatedComment.msg = "";
    this.setState({ comment: updatedComment, formIsValid: false });
  };

  deleteCommentHandler = (_id) => {
    if (this.props.teacherToken) {
      this.props.onDeleteComment(
        _id,
        this.props.teacherToken,
        "teacher",
        this.props.commentData
      );
    } else if (this.props.studentToken) {
      this.props.onDeleteComment(
        _id,
        this.props.studentToken,
        "student",
        this.props.commentData
      );
    }
    this.closeDeleteHandler();
  };

  showDeleteHandler = (e, cmtId) => {
    this.setState({ showDelete: true, commentId: cmtId });
    positionMenuDropdown(e, this.deleteDropdownRef);
  };

  closeDeleteHandler = () => {
    this.deleteDropdownRef.current.style.display = "none";
    this.setState({ showDelete: false });
  };

  render() {
    const {
      submitCmtError,
      deleteCmtError,
      commentLoading,
      commentError,
      commentData,
      data,
      studentToken,
      teacherToken,
      userData,
      sideLecData,
    } = this.props;

    let commentBox;
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    let streamLink;
    if (teacherToken) {
      streamLink = "/teacher/";
    } else if (studentToken) {
      streamLink = "/student/";
    }

    commentBox = commentData.map((cmtData) => (
      <div key={cmtData._id}>
        <Comment
          isAdmin={cmtData.userName === userData.name}
          deleteBtn={(e) => {
            this.showDeleteHandler(e, cmtData._id);
          }}
          userName={cmtData.userName}
          date={timeSince(cmtData.date)}
          userImage={`http://${localhost}:8080/${cmtData.userImage}`}
        >
          {cmtData.msg}
        </Comment>
      </div>
    ));
    if (commentError) {
      commentBox = (
        <div className={classes.Error}>Failed to Fetch Comments.</div>
      );
    } else if (commentLoading) {
      commentBox = <Spinner />;
    }

    const videoData = { ...data };
    return (
      <main className={classes.Stream}>
        {submitCmtError ? (
          <ErrorModal error>Can't Post Comment! Try Again.</ErrorModal>
        ) : null}
        {deleteCmtError ? (
          <ErrorModal error>Can't Delete Comment! Try Again.</ErrorModal>
        ) : null}
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
              <div
                className={classes.StreamContainerDescBox}
                dangerouslySetInnerHTML={{
                  __html: `${
                    videoData.description
                      ? parseMarkdown(videoData.description)
                      : null
                  }`,
                }}
              ></div>
            </div>
            <div className={classes.CommentBox}>
              <h1 className={classes.CommentBoxHeading}>Comments</h1>
              <div className={classes.CommentBoxUser}>
                <figure>
                  <img
                    src={`http://${localhost}:8080/${userData.image}`}
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
                    value={this.state.comment.msg}
                  />
                  <div className={classes.CommentFormSubmit}>
                    <button type="submit" disabled={!this.state.formIsValid}>
                      Publish
                    </button>
                  </div>
                </form>
              </div>

              <div className={classes.UsersCommentContainer}>{commentBox}</div>
            </div>
          </div>
          <MenuDropdown
            clicked={this.closeDeleteHandler}
            menuDropdownRef={this.deleteDropdownRef}
            showMenu={this.state.showDelete}
          >
            <button
              onClick={() => {
                this.deleteCommentHandler(this.state.commentId);
              }}
              className={classes.DeleteBtn}
            >
              Delete
            </button>
          </MenuDropdown>
        </section>

        <aside className={classes.StreamSidebar}>
          <header className={classes.StreamSidebarHeader}>
            <h1>Similar Lectures</h1>
          </header>
          <main className={classes.StreamSidebarContainer}>
            <ul className={classes.StreamSidebarContainerList}>
              {sideLecData.map((data) => (
                <li
                  key={data._id}
                  className={
                    data._id === videoData._id
                      ? classes.StreamSidebarContainerItem
                      : null
                  }
                >
                  <NavLink
                    to={streamLink + "watch?v=" + data._id}
                    className={classes.StreamSidebarContainerLink}
                    activeClassName={classes.Active}
                  >
                    <figure className={classes.StreamSidebarContainerImg}>
                      <img
                        src={`http://${localhost}:8080/` + data.image}
                        alt="lecture"
                      />
                    </figure>
                    <div className={classes.StreamSidebarBox}>
                      <h4>{data.title}</h4>
                      <span>{data.name}</span>
                    </div>
                  </NavLink>
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
    loading: state.stream.loading,
    error: state.stream.error,

    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
    userData: state.profile.data,

    sideLecData: state.videoLec.data,

    commentData: state.stream.comment,
    commentLoading: state.stream.cmtLoading,
    commentError: state.stream.cmtError,

    submitCmtError: state.stream.submitCmtError,
    deleteCmtError: state.stream.deleteCmtError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (_id, token, url) => {
      dispatch(actionCreators.getVideo(_id, token, url));
    },
    onPostComment: (token, url, videoId, commentData) => {
      dispatch(actionCreators.postComment(token, url, videoId, commentData));
    },
    onLoadComment: (localhost, token, url, videoId) => {
      dispatch(actionCreators.getComments(localhost, token, url, videoId));
    },
    onAddComment: (comment) => {
      dispatch(actionCreators.addComment(comment));
    },
    onDeleteComment: (_id, token, url, commentData) => {
      dispatch(actionCreators.deleteComment(_id, token, url, commentData));
    },
    onLoadLecture: (token, url) => {
      dispatch(actionCreatorsVideo.loadVidLec(token, url));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StreamLecture));
