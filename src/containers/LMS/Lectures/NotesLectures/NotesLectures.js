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
import {withRouter} from 'react-router-dom';
import SkeletonLecture from "../../../../components/Lecture/Skeleton/SkeletonLecture";
import openSocket from 'socket.io-client';

class NotesLectures extends React.PureComponent {
  componentDidMount() {
    if(this.props.teacherToken) {
    this.props.onLoadLecture(this.props.teacherToken, '/teacher/lecture/book');
    } else if(this.props.studentToken) {
      this.props.onLoadLecture(this.props.studentToken, '/student/lecture/book' + this.props.location.search);
    }
  }

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
    // console.log(this.props);
    let notes;
    if (this.props.loading) {
      notes = [1,2].map((data) => {
        return <SkeletonLecture key={data} />
      });
    } else {
        notes = this.props.data.map((data) => (
            <Lecture
                link={'http://localhost:8080/'+data.pdf}
                title={data.title}
                key={data._id}
                date={data.date}
                img={img}
                name={data.subject}
                deleteHandler={() => {
                  this.deleteNotesHandler(data._id);
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
            <AddNotesLecture closed={this.closeModal} />
          </Modal>
      );
    }
    return (
      <React.Fragment>
        <SearchBar />
        <section className={classes.NotesLectures}>
          <div className={classes.NotesLecturesDiv}>
            {notes}
            {/*<LectureAddBtn clicked={this.showModal} />*/}
            {addLectureBtn}
          </div>
        </section>
        {/*<Modal clicked={this.closeModal} show={this.props.show}>*/}
        {/*  <AddNotesLecture closed={this.closeModal} />*/}
        {/*</Modal>*/}
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
    onLoadLecture: (token, url) => {
      dispatch(actionCreators.loadNotesLec(token, url));
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotesLectures));
