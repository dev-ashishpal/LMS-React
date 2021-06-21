import React from "react";
import classes from "./VideoLectures.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../../components/Lecture/Lecture";
import LectureAddBtn from "../../../../components/LectureAddBtn/LectureAddBtn";
import Modal from "../../../../components/UI/Modal/Modal";
import AddVideoLecture from "./AddVideoLecture/AddVideoLecture";
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import ErrorHandler from "../../../../components/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionCreators from "./store/actions";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import ErrorModal from "../../../../components/UI/ErrorModal/ErrorModal";
import {userAgent} from "../../../../util/userAgent";

class VideoLectures extends React.PureComponent {
  constructor(props) {
    super(props);
    this.lectureRef = React.createRef();
    this.loadingRef = React.createRef();
  }

  state = {
    isIntersecting: false,
  };

  componentDidMount() {
    localStorage.setItem('URL',window.location.pathname);
    if (this.props.teacherToken) {
      this.props.onLoadLecture(
        this.props.teacherToken,
        "/teacher/lecture/video",
      );
    } else if (this.props.studentToken) {
      this.props.onLoadLecture(
        this.props.studentToken,
        "/student/lecture/video" + this.props.location.search,
      );
    }
    // console.log(this.state.isIntersecting);
    this.observerHandler();
  }

  componentDidUpdate() {
    // this.observerHandler();
  }

  observerHandler = () => {
    const callback = (entries) => {
      if (entries[0].isIntersecting && entries[0].intersectionRatio === 1) {
        // console.log("Is intersecting");
      }
    };
    const options = {
      root: null,
      rootMargins: "-10px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.loadingRef.current);
    // console.log(this.loadingRef.current);
  };

  openedAddLectureModal = () => {
    this.props.onShowModal();
  };

  closedAddLectureModal = () => {
    this.props.onCloseModal();
  };

  deleteLectureHandler = (_id) => {
    this.props.onDeleteLecture(_id, this.props.data, this.props.teacherToken);
  };

  editLectureHandler = (_id) => {
    this.openedAddLectureModal();
    this.props.onEditLecture(_id, this.props.data);
  };

  addToWlHandler = (_id) => {
    this.props.onAddToWl(_id, this.props.studentToken);
  };

  onSearchHandler = (e) => {
    // console.log(e.target.value);
    const searchTitle = e.target.value;
    console.log(searchTitle.toUpperCase());
  };

  render() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }
    //////
    let streamLink;
    if (this.props.teacherToken) {
      streamLink = "/teacher/watch/";
    } else if (this.props.studentToken) {
      streamLink = "/student/watch/";
    }
    //////
    let lecture;
    if (this.props.loading) {
      lecture = [1, 2].map((data) => {
        return <SkeletonLecture key={data} />;
      });
    } else if (this.props.error) {
      lecture = <ErrorHandler>{this.props.error.message}</ErrorHandler>;
    } else {
      lecture = this.props.data.map((data) => {
        this.props.watchlist.forEach((wl) => {
          if (wl._id === data._id) {
            console.log("ids match");
          }
        });
        return (
          <Lecture
            src={data.video}
            img={"http://"+ localhost +":8080/" + data.image}
            title={data.title}
            key={data._id}
            isVideo={this.props.isVideo}
            date={data.date}
            name={data.subject}
            link={streamLink + data._id}
            addedToWl={this.props.addedToWl}
            deleteHandler={() => {
              this.deleteLectureHandler(data._id);
            }}
            editHandler={() => {
              this.editLectureHandler(data._id);
            }}
            addToWlHandler={() => {
              this.addToWlHandler(data._id);
            }}
          />
        );
      });
    }

    let addLectureBtn = null;
    let addLectureModal = null;
    if (this.props.teacherToken) {
      addLectureBtn = <LectureAddBtn clicked={this.openedAddLectureModal} />;
      addLectureModal = (
        <Modal clicked={this.closedAddLectureModal} show={this.props.show}>
          <AddVideoLecture closed={this.closedAddLectureModal} />
        </Modal>
      );
    }

    let error = this.props.error;

    return (
      <React.Fragment>
        {error ? <ErrorModal error>{error}</ErrorModal> : null}
        <section ref={this.videoContainerRef} className={classes.VideoLectures}>
          <SearchBar onChange={this.onSearchHandler} />
          <div ref={this.lectureRef} className={classes.VideoLecturesDiv}>
            {addLectureBtn}
            {lecture}
          </div>
          <div ref={this.loadingRef}>
            &nbsp;
          </div>
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
    watchlist: state.videoLec.watchlist,
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
    onAddToWl: (_id, token) => {
      dispatch(actionCreators.watchlist(_id, token));
    },
    // onGetWatchlist:(token) => {dispatch(actionCreators.getWatchlist(token))}
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(VideoLectures));
