import React, { PureComponent, Fragment } from "react";
import classes from "./PapersLectures.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../../components/Lecture/Lecture";
import LectureAddBtn from "../../../../components/LectureAddBtn/LectureAddBtn";
import Modal from "../../../../components/UI/Modal/Modal";
import AddPaperLecture from "./AddPaperLecture/AddPaperLecture";
import { withRouter } from "react-router-dom";
import img from "../../../../assets/images/paper.png";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import { userAgent } from "../../../../util/userAgent";
import { search } from "../../../../util/search";
import PropTypes from "prop-types";

class PapersLectures extends PureComponent {
  constructor(props) {
    super(props);
    this.lectureRef = React.createRef();
  }
  componentDidMount() {
    // localStorage.setItem("URL", window.location.pathname);
    if (this.props.teacherToken) {
      this.props.onLoadLecture(
        this.props.teacherToken,
        "/teacher/lecture/paper"
      );
    } else if (this.props.studentToken) {
      this.props.onLoadLecture(
        this.props.studentToken,
        "/student/lecture/paper" + this.props.location.search
      );
    }
  }

  render() {
    let addLectureBtn = null;
    let addLectureModal = null;
    let localhost = "localhost";
    let paper;
    const { loading, error, data, teacherToken, studentToken } = this.props;

    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    if (teacherToken) {
      addLectureBtn = <LectureAddBtn clicked={this.props.onShowModal} />;
      addLectureModal = (
        <Modal clicked={this.props.onCloseModal} show={this.props.show}>
          <AddPaperLecture closed={this.props.onCloseModal} />
        </Modal>
      );
    }

    if (loading) {
      paper = [1, 2].map((data) => {
        return <SkeletonLecture key={data} />;
      });
    } else if (error) {
      paper = (
        <div className={classes.Error}>
          Error while Fetching Papers. Reload!
        </div>
      );
    } else {
      paper = data.map((dt) => (
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
    }

    return (
      <Fragment>
        <SearchBar
          onChange={(e) => {
            search(e, this.lectureRef);
          }}
        />
        <section className={classes.NotesLectures}>
          <div ref={this.lectureRef} className={classes.NotesLecturesDiv}>
            {addLectureBtn}
            {paper}
          </div>
        </section>
        {addLectureModal}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.paperLec.data,
    loading: state.paperLec.loading,
    error: state.paperLec.error,
    show: state.paperLec.show,
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadLecture: (token, url) =>
      dispatch(actionCreators.loadPaperLec(token, url)),
    onDeleteLecture: (id, prevData, token) =>
      dispatch(actionCreators.deletePaperLec(id, prevData, token)),
    onCloseModal: () => dispatch(actionCreators.closeModal()),
    onShowModal: () => dispatch(actionCreators.showModal()),
  };
};

PapersLectures.propTypes = {
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
)(withRouter(PapersLectures));
