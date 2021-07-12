import React, { PureComponent } from "react";
import classes from "./VideoLectures.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../../components/Lecture/Lecture";
import LectureAddBtn from "../../../../components/LectureAddBtn/LectureAddBtn";
import Modal from "../../../../components/UI/Modal/Modal";
import AddVideoLecture from "./AddVideoLecture/AddVideoLecture";
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionCreators from "./store/actions";
import { userAgent } from "../../../../util/userAgent";
import { search } from "../../../../util/search";

class VideoLectures extends PureComponent {
  constructor(props) {
    super(props);
    this.lectureRef = React.createRef();
    this.loadingRef = React.createRef();
  }

  componentDidMount() {

    // localStorage.setItem("URL", window.location.pathname);
    if (this.props.teacherToken) {
      this.props.onLoadLecture(
        this.props.teacherToken,
        "/teacher/lecture/video"
      );
    } else if (this.props.studentToken) {
      this.props.onLoadLecture(
        this.props.studentToken,
        "/student/lecture/video" + this.props.location.search
      );
    }
  }

  deleteLectureHandler = (_id) => {
    this.props.onDeleteLecture(_id, this.props.data, this.props.teacherToken);
  };

  editLectureHandler = (_id) => {
    this.props.onShowModal();
    this.props.onEditLecture(_id, this.props.data);
  };

  render() {
    let localhost = "localhost";
    let streamLink;
    let lecture;
    let addLectureBtn = null;
    let addLectureModal = null;
    const {teacherToken, studentToken, loading, error, data} = this.props;

    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    if (teacherToken) {
      streamLink = "/teacher/watch?v=";
      addLectureBtn = <LectureAddBtn clicked={this.props.onShowModal} />;
      addLectureModal = (
        <Modal clicked={this.props.onCloseModal} show={this.props.show}>
          <AddVideoLecture closed={this.props.onCloseModal} />
        </Modal>
      );
    } else if (studentToken) {
      streamLink = "/student/watch?v=";
    }

    if (loading) {
      lecture = [1, 2].map((data) => {
        return <SkeletonLecture key={data} />;
      });
    } else if (error) {
      lecture = (
        <div className={classes.Error}>
          Error while Fetching Video Lectures. Reload!
        </div>
      );
    } else {
      lecture = data.map((data) => (
        <Lecture
          src={data.video}
          img={"http://" + localhost + ":8080/" + data.image}
          title={data.title}
          key={data._id}
          isVideo={this.props.isVideo}
          date={data.date}
          subject={
            teacherToken
              ? data.branch
              : studentToken
              ? data.subject
              : null
          }
          link={streamLink + data._id}
          deleteHandler={() => {
            this.deleteLectureHandler(data._id);
          }}
          editHandler={() => {
            this.editLectureHandler(data._id);
          }}
        />
      ));
    }

    return (
      <React.Fragment>
        <section ref={this.videoContainerRef} className={classes.VideoLectures}>
          <SearchBar
            onChange={(e) => {
              search(e, this.lectureRef);
            }}
          />
          <div ref={this.lectureRef} className={classes.VideoLecturesDiv}>
            {addLectureBtn}
            {lecture}
          </div>
          <div ref={this.loadingRef}>&nbsp;</div>
        </section>
        {addLectureModal}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.videoLec.data,
    error: state.videoLec.error,
    loading: state.videoLec.loading,
    editing: state.videoLec.editing,
    editPost: state.videoLec.editPost,
    show: state.videoLec.show,
    isVideo: state.videoLec.isVideo,
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadLecture: (token, url) => {
      dispatch(actionCreators.loadVidLec(token, url));
    },
    onDeleteLecture: (_id, data, token) => {
      dispatch(actionCreators.deleteVidLec(_id, data, token));
    },
    onEditLecture: (_id, data) => {
      dispatch(actionCreators.editVidLec(_id, data));
    },
    onShowModal: () => {
      dispatch(actionCreators.showModal());
    },
    onCloseModal: () => {
      dispatch(actionCreators.closeModal());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VideoLectures));
