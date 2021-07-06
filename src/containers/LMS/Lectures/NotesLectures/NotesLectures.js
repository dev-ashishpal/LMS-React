import React from "react";
import classes from "./NotesLectures.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../../components/Lecture/Lecture";
import LectureAddBtn from "../../../../components/LectureAddBtn/LectureAddBtn";
import Modal from "../../../../components/UI/Modal/Modal";
import AddNotesLecture from "./AddNotesLecture/AddNotesLecture";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import img from "../../../../assets/images/notes.png";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import { userAgent } from "../../../../util/userAgent";
import { search } from "../../../../util/search";
import ErrorModal from "../../../../components/UI/ErrorModal/ErrorModal";

class NotesLectures extends React.PureComponent {
  constructor(props) {
    super(props);
    this.lectureRef = React.createRef();
    this.loadingRef = React.createRef();
    this.notesContainerRef = React.createRef();
  }
  componentDidMount() {
    localStorage.setItem("URL", window.location.pathname);
    if (this.props.teacherToken) {
      this.props.onLoadLecture(
        this.props.teacherToken,
        "/teacher/lecture/book"
      );
    } else if (this.props.studentToken) {
      this.props.onLoadLecture(
        this.props.studentToken,
        "/student/lecture/book" + this.props.location.search
      );
    }
    console.log(this.lectureRef.current.lastElementChild);
    this.observerHandler();
  }

  observerHandler = () => {
    let page = 1;
    const callback = (entries) => {
      if (entries[0].isIntersecting && entries[0].intersectionRatio === 1) {
        page = page + 1;
        console.log("Is intersecting", page);
        if (this.props.teacherToken) {
          this.props.onPaginateLecture(
            this.props.teacherToken,
            "/teacher/lecture/book",
            page
          );
        } else if (this.props.studentToken) {
          this.props.onPaginateLecture(
            this.props.studentToken,
            "/student/lecture/book" + this.props.location.search,
            page
          );
        }
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

  deleteNotesHandler = (_id) => {
    this.props.onDeleteLecture(_id, this.props.data, this.props.teacherToken);
  };

  showModal = () => {
    this.props.onShowModal();
  };

  closeModal = () => {
    this.props.onCloseModal();
  };

  render() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    let notes;
    if (this.props.loading) {
      notes = [1, 2].map((data) => {
        return <SkeletonLecture key={data} />;
      });
    } else {
      notes = this.props.data.map((data) => (
        <Lecture
          link={"http://" + localhost + ":8080/" + data.pdf}
          title={data.title}
          key={data._id}
          date={data.date}
          img={img}
          subject={
            this.props.teacherToken
              ? data.branch
              : this.props.studentToken
              ? data.subject
              : null
          }
          deleteHandler={() => {
            this.deleteNotesHandler(data._id);
          }}
        />
      ));
    }

    let paginateLoading = null;
    if (this.props.paginateLoading) {
      paginateLoading = <Spinner />;
    }

    let addLectureBtn = null;
    let addLectureModal = null;
    if (this.props.teacherToken) {
      addLectureBtn = <LectureAddBtn clicked={this.showModal} />;
      addLectureModal = (
        <Modal clicked={this.closeModal} show={this.props.show}>
          <AddNotesLecture closed={this.closeModal} />
        </Modal>
      );
    }
    let error = this.props.error;
    return (
      <React.Fragment>
        {error ? <ErrorModal error>{error}</ErrorModal> : null}
        <section ref={this.notesContainerRef} className={classes.NotesLectures}>
          <SearchBar
            onChange={(e) => {
              search(e, this.lectureRef);
            }}
          />
          <div ref={this.lectureRef} className={classes.NotesLecturesDiv}>
            {addLectureBtn}
            {notes}
          </div>
          <div ref={this.loadingRef}>&nbsp;</div>
          {paginateLoading}
        </section>
        {addLectureModal}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.notesLec.data,
    loading: state.notesLec.loading,
    paginateLoading: state.notesLec.paginateLoading,
    error: state.notesLec.error,
    show: state.notesLec.show,
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadLecture: (token, url, page) => {
      dispatch(actionCreators.loadNotesLec(token, url, page));
    },
    onPaginateLecture: (token, url, page) => {
      dispatch(actionCreators.paginateNotesLec(token, url, page));
    },
    onDeleteLecture: (_id, prevData, token) => {
      dispatch(actionCreators.deleteNotesLec(_id, prevData, token));
    },
    onCloseModal: () => {
      dispatch(actionCreators.closeModal());
    },
    onShowModal: () => {
      dispatch(actionCreators.showModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotesLectures));
