import React, { Fragment, PureComponent } from "react";
import classes from "./AddNotesLecture.module.css";
import TextInput from "../../../../../components/UI/Input/TextInput/TextInput";
import FileInput from "../../../../../components/UI/Input/FileInput/FileInput";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";
import Select from "../../../../../components/UI/SelectDropdown/Select";
import { required } from "../../../../../util/validators";
import ErrorModal from "../../../../../components/UI/ErrorModal/ErrorModal";

class AddNotesLecture extends PureComponent {
  state = {
    pdf: {
      preview: false,
      icon: "#icon-file_upload",
      file: null,
      touched: false,
      valid: false,
      required,
    },
    title: {
      name: null,
      valid: false,
      touched: false,
      required,
    },
    branches: {
      elementType: "select",
      elementConfig: {
        options: this.props.branches,
      },
      value: [],
      valid: false,
      touched: false,
      validation: {
        required: false,
      },
    },
    formIsValid: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.title.valid &&
      this.state.pdf.valid &&
      this.state.branches.valid
    ) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  }

  titleChangeHandler = (e) => {
    const titleElem = { ...this.state.title };
    titleElem.name = e.target.value;
    titleElem.touched = true;
    titleElem.valid = titleElem.required(e.target.value);
    this.setState({ title: titleElem });
  };

  previewPdf = (e) => {
    const pdfElem = { ...this.state.pdf };
    pdfElem.preview = true;
    pdfElem.touched = true;
    pdfElem.icon = "#icon-file_download_done";
    pdfElem.file = e.target.files[0];
    pdfElem.valid = pdfElem.required(e.target.files[0].name);
    this.setState({ pdf: pdfElem });
  };

  selectChangeHandler = (event) => {
    let selectedData = [];
    selectedData.push(event.target.value);
    const branchesElement = { ...this.state.branches };
    branchesElement.value = selectedData;
    branchesElement.valid = branchesElement.value.length !== 0;
    branchesElement.touched = true;
    this.setState({ branches: branchesElement });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const notesData = new FormData();
    notesData.append("pdf", this.state.pdf.file);
    notesData.append("title", this.state.title.name);
    notesData.append("branch", this.state.branches.value);

    this.props.onSubmit(notesData, this.props.teacherToken);
  };
  render() {
    const { error } = this.props;
    let form = (
      <form
        className={classes.Form}
        encType="multipart/form-data"
        onSubmit={this.submitHandler}
      >
        {/*  Input Title */}
        <TextInput
          label="Title"
          type="text"
          inputtype="input"
          name="paperTitle"
          onChange={this.titleChangeHandler}
          valid={this.state.title.valid ? 1 : 0}
          touched={this.state.title.touched ? 1 : 0}
        />

        {/*    Input PDF   */}
        <FileInput
          type="file"
          label="book"
          subtext="Upload the Book PDF."
          inputtype="pdf"
          icon={this.state.pdf.icon}
          changed={this.previewPdf}
          preview={this.state.pdf.preview}
        />
        <Select
          data={this.state.branches.elementConfig.options}
          changed={this.selectChangeHandler}
          selectType="radio"
          list={this.state.branches.value}
        />
        <button
          className={classes.ModalSubmitBtn}
          disabled={!this.state.formIsValid}
          type="submit"
        >
          Upload
        </button>
      </form>
    );
    return (
      <Fragment>
        {error ? (
          <ErrorModal error>Error!! Refresh and Try Again.</ErrorModal>
        ) : null}
        <div className={classes.ModalContainer}>
          <button
            className={classes.ModalCancelBtn}
            onClick={this.props.closed}
          >
            &times;
          </button>
          <h1 className={classes.ModalHeading}>Add Book or Notes</h1>
          {form}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.notesLec.submitError,
    branches: state.lec.branches,
    teacherToken: state.auth.teacherToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (notesData, token) => {
      dispatch(actionCreators.submitNotesLec(notesData, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNotesLecture);
