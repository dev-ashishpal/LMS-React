import React from "react";
import classes from "./AddPaperLecture.module.css";
import TextInput from "../../../../../components/UI/Input/TextInput/TextInput";
import FileInput from "../../../../../components/UI/Input/FileInput/FileInput";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../../../../components/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import Select from "../../../../../components/UI/SelectDropdown/Select";
import { required } from "../../../../../util/validators";

class AddPaperLecture extends React.PureComponent {
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
    loading: false,
    error: null,
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
    console.log("select Changed");
    let selectedData = [];
    selectedData.push(event.target.value);

    const branchesElement = { ...this.state.branches };
    branchesElement.value = selectedData;
    console.log(branchesElement.value.length);
    branchesElement.valid = branchesElement.value.length !== 0;
    branchesElement.touched = true;
    this.setState({ branches: branchesElement });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const paperData = new FormData();
    paperData.append("pdf", this.state.pdf.file);
    paperData.append("title", this.state.title.name);
    paperData.append("branch", this.state.branches.value);

    this.props.onSubmit(paperData, this.props.teacherToken);
  };
  render() {
    let form;
    if (this.props.loading) {
      form = <Spinner />;
    } else if (this.props.error) {
      form = <ErrorHandler>{this.props.error.message}</ErrorHandler>;
    } else {
      form = (
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
            valid={this.state.title.valid}
            touched={this.state.title.touched}
          />

          {/*    Input PDF   */}
          <FileInput
            type="file"
            label="paper"
            pdfIcon="#icon-file_download_done"
            subtext="Upload the Paper PDF."
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
          <button className={classes.ModalSubmitBtn} disabled={!this.state.formIsValid} type="submit">
            Upload
          </button>
        </form>
      );
    }
    return (
      <React.Fragment>
        <div className={classes.ModalContainer}>
          <button
            className={classes.ModalCancelBtn}
            onClick={this.props.closed}
          >
            &times;
          </button>
          <h1 className={classes.ModalHeading}>Add Previous Paper</h1>
          {form}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.paperLec.loading,
    error: state.paperLec.error,
    branches: state.lec.branches,
    teacherToken: state.auth.teacherToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (paperData, token) =>
      dispatch(actionCreators.submitPaperLec(paperData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPaperLecture);
