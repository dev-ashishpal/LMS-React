import React, { Component } from "react";
import classes from "./StreamLecture.module.css";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import sprite from "../../../assets/svg/sprite.svg";
import img from "../../../assets/images/maths3.jpg";
import userImg from "../../../assets/images/user.jpg";
import { withRouter, Link } from "react-router-dom";
import axiosInstance from "../../../axios-lms";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import { timeSince } from "../../../util/timeSince";

class StreamLecture extends Component {
  state = {
    isPlaying: false,
  };

  componentDidMount() {
    const _id = this.props.match.params.id;
    // console.log(this.props.match);
    if (this.props.teacherToken) {
      this.props.onLoad(_id, this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.props.onLoad(_id, this.props.studentToken, "student");
    }
  }

  onLoadingVideo = (_id) => {
    if (this.props.teacherToken) {
      return this.props.onLoad(_id, this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      return this.props.onLoad(_id, this.props.studentToken, "student");
    }
  };

  render() {
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
          {/*video player*/}
          <VideoPlayer src={videoData.video} />
          <div className={classes.StreamContainerDetails}>
            <div className={classes.StreamContainerHeader}>
              {/*{title}*/}
              <h3>{videoData.title}</h3>
              <span>{timeSince(videoData.date)}</span>
              <span className={classes.StreamContainerIcon}>
                <svg>
                  <use href={sprite + "#icon-dots-three-horizontal"}></use>
                </svg>
              </span>
            </div>

            <div className={classes.StreamContainerDesc}>
              <p>{videoData.description}</p>
            </div>
            <div className={classes.CommentBox}>
              <h1 className={classes.CommentBoxHeading}>Comments</h1>
              <div className={classes.CommentBoxUser}>
                <figure>
                  <img
                    src={
                      "http://localhost:8080/" + this.props.teacherData.image
                    }
                    alt="user_image"
                  />
                </figure>
                <form className={classes.CommentForm}>
                  <label htmlFor="add-comment" hidden>
                    Add New Comment
                  </label>
                  <textarea id="add-comment" placeholder="Add New Comment" />
                  <div className={classes.CommentFormSubmit}>
                    <button type="submit">Publish</button>
                  </div>
                </form>
              </div>

              <div className={classes.UsersCommentContainer}>
                <article className={classes.UsersComment}>
                  <figure className={classes.UsersCommentImg}>
                    <img src={userImg} alt="user_image" />
                  </figure>
                  <div className={classes.UsersCommentDetail}>
                    <div className={classes.UsersCommentHeading}>
                      <h4>User</h4>
                      <span>just now</span>
                    </div>
                    <div className={classes.UsersCommentPara}>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nam, ut?
                      </p>
                    </div>
                  </div>
                </article>

                <article className={classes.UsersComment}>
                  <figure className={classes.UsersCommentImg}>
                    <img src={userImg} alt="user_image" />
                  </figure>
                  <div className={classes.UsersCommentDetail}>
                    <div className={classes.UsersCommentHeading}>
                      <h4>User</h4>
                      <span>1 hour ago</span>
                    </div>
                    <div className={classes.UsersCommentPara}>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Culpa cumque cupiditate ea illum nihil non nostrum
                        optio perspiciatis quis voluptas.
                      </p>
                    </div>
                  </div>
                </article>

                <article className={classes.UsersComment}>
                  <figure className={classes.UsersCommentImg}>
                    <img src={userImg} alt="user_image" />
                  </figure>
                  <div className={classes.UsersCommentDetail}>
                    <div className={classes.UsersCommentHeading}>
                      <h4>User</h4>
                      <span>2 days ago</span>
                    </div>
                    <div className={classes.UsersCommentPara}>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Corporis ducimus illo maiores nostrum quis saepe
                        sunt veritatis voluptatum. Debitis distinctio dolorum
                        magnam maxime neque perferendis placeat praesentium
                        quidem, quod temporibus.
                      </p>
                    </div>
                  </div>
                </article>
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
                        src={"http://localhost:8080/" + data.image}
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
    teacherData: state.profile.data,
    studentToken: state.auth.studentToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (_id, token, url) => {
      dispatch(actionCreators.loadVideo(_id, token, url));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StreamLecture));
