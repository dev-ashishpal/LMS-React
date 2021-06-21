import React from "react";
import classes from "./PapersLectures.module.css";
import SearchBar from "../../../../components/UI/SearchBar/SearchBar";
import Lecture from "../../../../components/Lecture/Lecture";
import LectureAddBtn from "../../../../components/LectureAddBtn/LectureAddBtn";
import Modal from "../../../../components/UI/Modal/Modal";
import AddPaperLecture from "./AddPaperLecture/AddPaperLecture";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import img from "../../../../assets/images/paper.png";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import {userAgent} from "../../../../util/userAgent";

class PapersLectures extends React.PureComponent {
  componentDidMount() {
    localStorage.setItem('URL',window.location.pathname);
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

  showModal = () => {
    this.props.onShowModal();
  };

  closeModal = () => {
    this.props.onCloseModal();
  };

  deletePaperHandler = (_id) => {
    this.props.onDeleteLecture(_id, this.props.data, this.props.teacherToken);
  };

  render() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }
    // console.log('[paper]',this.props);
    let paper;
    if (this.props.loading) {
      paper = [1, 2].map((data) => {
        return <SkeletonLecture key={data} />;
      });
    } else {
      paper = this.props.data.map((data) => (
        <Lecture
          link={"http://" + localhost + ":8080/" + data.pdf}
          title={data.title}
          key={data._id}
          date={data.date}
          img={img}
          name={data.subject}
          deleteHandler={() => {
            this.deletePaperHandler(data._id);
          }}
        />
      ));
    }

    let addLectureBtn = null;
    let addLectureModal = null;
    if (this.props.teacherToken) {
      addLectureBtn = <LectureAddBtn clicked={this.showModal} />;
      addLectureModal = (
        <Modal clicked={this.closeModal} show={this.props.show}>
          <AddPaperLecture closed={this.closeModal} />
        </Modal>
      );
    }

    return (
      <React.Fragment>
        <SearchBar />
        <section className={classes.NotesLectures}>
          <div className={classes.NotesLecturesDiv}>
            {addLectureBtn}
            {paper}
          </div>
        </section>
        {addLectureModal}
      </React.Fragment>
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
    onLoadLecture: (token, url) => dispatch(actionCreators.loadPaperLec(token, url)),
    onDeleteLecture: (id, prevData, token) =>
      dispatch(actionCreators.deletePaperLec(id, prevData, token)),
    onCloseModal: () => dispatch(actionCreators.closeModal()),
    onShowModal: () => dispatch(actionCreators.showModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PapersLectures));
