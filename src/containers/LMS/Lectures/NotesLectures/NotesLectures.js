import React, { PureComponent } from "react";
import classes from "./NotesLectures.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../../components/Lecture/Lecture";
import LectureAddBtn from "../../../../components/LectureAddBtn/LectureAddBtn";
import Modal from "../../../../components/UI/Modal/Modal";
import AddNotesLecture from "./AddNotesLecture/AddNotesLecture";
import img from "../../../../assets/images/notes.png";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import { userAgent } from "../../../../util/userAgent";
import { search } from "../../../../util/search";
import PropTypes from "prop-types";

class NotesLectures extends PureComponent {
  constructor(props) {
    super(props);
    this.lectureRef = React.createRef();
    this.loadingRef = React.createRef();
    this.notesContainerRef = React.createRef();
  }
  componentDidMount() {
    const { teacherToken, studentToken } = this.props;
    localStorage.setItem("URL", window.location.pathname);
    if (teacherToken) {
      this.props.onLoadLecture(teacherToken, "/teacher/lecture/book");
    } else if (studentToken) {
      this.props.onLoadLecture(
        studentToken,
        "/student/lecture/book" + this.props.location.search
      );
    }
  }

  render() {
    const { data, error, loading, teacherToken, studentToken } = this.props;
    let addLectureBtn = null;
    let addLectureModal = null;
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    if (teacherToken) {
      addLectureBtn = <LectureAddBtn clicked={this.props.onShowModal} />;
      addLectureModal = (
        <Modal clicked={this.props.onCloseModal} show={this.props.show}>
          <AddNotesLecture closed={this.props.onCloseModal} />
        </Modal>
      );
    }

    let notes = data.map((dt) => (
      <Lecture
        link={"http://" + localhost + ":8080/" + dt.pdf}
        title={dt.title}
        key={dt._id}
        date={dt.date}
        img={img}
        subject={teacherToken ? dt.branch : studentToken ? dt.subject : null}
        deleteHandler={() => {
          this.props.onDeleteLecture(dt._id, data, teacherToken);
        }}
      />
    ));

    if (loading) {
      notes = [1, 2].map((data) => {
        return <SkeletonLecture key={data} />;
      });
    } else if (error) {
      notes = (
        <div className={classes.Error}>Error while Fetching Notes. Reload!</div>
      );
    }

    return (
      <React.Fragment>
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

NotesLectures.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  show: PropTypes.bool,
  teacherToken: PropTypes.string,
  studentToken: PropTypes.string,
  location: PropTypes.object,

  onLoadLecture: PropTypes.func,
  onDeleteLecture: PropTypes.func,
  onShowModal: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotesLectures));
