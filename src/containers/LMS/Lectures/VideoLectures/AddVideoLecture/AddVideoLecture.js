import React, { PureComponent, Fragment } from "react";
import classes from "./AddVideoLecture.module.css";
import TextInput from "../../../../../components/UI/Input/TextInput/TextInput";
import FileInput from "../../../../../components/UI/Input/FileInput/FileInput";
import GooglePicker from "react-google-picker";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import { generateBase64FromImage } from "../../../../../util/imagePreview";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import Select from "../../../../../components/UI/SelectDropdown/Select";
import { required } from "../../../../../util/validators";
import { userAgent } from "../../../../../util/userAgent";
import {
  REACT_APP_DEVELOPER_CLIENT_ID,
  REACT_APP_DEVELOPER_KEY,
} from "../../../../../util/env";
import ErrorModal from "../../../../../components/UI/ErrorModal/ErrorModal";

class AddVideoLecture extends PureComponent {
  state = {
    image: {
      preview: false,
      url: "",
      valid: false,
      file: null,
      path: null,
      touched: false,
      required,
      icon: "#icon-add_photo_alternate",
    },
    video: {
      preview: false,
      url: "",
      valid: false,
      touched: false,
      required,
      icon: "#icon-file_upload",
    },
    title: {
      name: "",
      valid: false,
      touched: false,
      required,
    },
    description: {
      name: "",
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
      required: false,
    },
    loading: false,
    error: null,
    date: Date.now().toString(),
    formIsValid: false,
  };

  componentDidMount() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }
    if (this.props.editing && this.props.selectedPost) {
      const branchElem = { ...this.state.branches };

      const branch = [];
      branch.push(this.props.selectedPost.branch);
      branchElem.value = branch;
      branchElem.valid = true;

      const imageElem = { ...this.state.image };
      imageElem.valid = true;
      imageElem.preview = true;
      imageElem.url =
        "http://" + localhost + ":8080/" + this.props.selectedPost.image;
      imageElem.path = this.props.selectedPost.image;

      const videoElem = { ...this.state.video };
      videoElem.valid = true;
      videoElem.preview = true;
      videoElem.url = this.props.selectedPost.video;

      const titleElem = { ...this.state.title };
      titleElem.name = this.props.selectedPost.title;
      titleElem.valid = true;

      const descElem = { ...this.state.description };
      descElem.name = this.props.selectedPost.description;
      descElem.valid = true;

      this.setState({
        title: titleElem,
        image: imageElem,
        video: videoElem,
        description: descElem,
        branches: branchElem,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setState({ loading: true });
    if (
      this.state.image.valid &&
      this.state.video.valid &&
      this.state.title.valid &&
      this.state.description.valid &&
      this.state.branches.valid
    ) {
      this.setState({ formIsValid: true });
    } else {
      this.setState({ formIsValid: false });
    }
  }

  previewImage = (event) => {
    const imageElem = { ...this.state.image };
    imageElem.preview = true;
    imageElem.icon = "#icon-file_download_done";
    this.setState({
      image: imageElem,
    });
    const imageUrl = event.target.files;
    generateBase64FromImage(imageUrl[0])
      .then((b64) => {
        const imageElem = { ...this.state.image };
        imageElem.touched = true;
        imageElem.url = b64;
        imageElem.file = imageUrl[0];
        imageElem.valid = imageElem.required(b64);
        this.setState({
          image: imageElem,
        });
      })
      .catch((e) => {
        const imageElem = { ...this.state.image };
        imageElem.valid = false;
        imageElem.url = null;
        this.setState({ image: imageElem });
      });
  };

  titleChangeHandler = (e) => {
    const titleElem = { ...this.state.title };
    titleElem.name = e.target.value;
    titleElem.touched = true;
    titleElem.valid = titleElem.required(e.target.value);
    this.setState({ title: titleElem });
  };
  descriptionChangeHandler = (e) => {
    const descElem = { ...this.state.description };
    descElem.name = e.target.value;
    descElem.touched = true;
    descElem.valid = descElem.required(e.target.value);
    this.setState({ description: descElem });
  };

  previewVideo = () => {
    const videoElem = { ...this.state.video };
    videoElem.preview = true;

    videoElem.icon = "#icon-file_download_done";

    this.setState({
      video: videoElem,
    });
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

    const videoData = new FormData();
    videoData.append("image", this.state.image.file);
    videoData.append("video", this.state.video.url);
    videoData.append("title", this.state.title.name);
    videoData.append("description", this.state.description.name);
    videoData.append("branch", this.state.branches.value);
    videoData.append("imagePath", this.state.image.path);

    this.props.onSubmit(
      this.props.editing,
      this.props.selectedPost,
      videoData,
      this.props.data,
      this.props.teacherToken
    );
  };

  render() {
    let form;
    const {error, loading} = this.props;

    if (loading) {
      form = <Spinner />;
    } else {
      form = (
        <form
          className={classes.Form}
          encType="multipart/form-data"
          onSubmit={this.submitHandler}
        >
          <TextInput
            label="Title"
            type="text"
            inputtype="input"
            name="lectureTitle"
            onChange={this.titleChangeHandler}
            value={this.state.title.name}
            valid={this.state.title.valid ? 1 : 0}
            touched={this.state.title.touched ? 1 : 0}
          />

          <GooglePicker
            clientId={REACT_APP_DEVELOPER_CLIENT_ID}
            developerKey={REACT_APP_DEVELOPER_KEY}
            scope={["https://www.googleapis.com/auth/drive.readonly"]}
            onChange={(data) => {
              if (data.action === "picked") {
                const downloadableLink = data.docs[0].url.replace(
                  /\/file\/d\/(.+)\/(.+)/,
                  "/uc?export=download&id=$1"
                );
                const videoElem = { ...this.state.video };
                videoElem.url = downloadableLink;
                videoElem.touched = true;
                videoElem.valid = videoElem.required(downloadableLink);
                this.setState({
                  video: videoElem,
                });
                this.previewVideo();
              }
            }}
            onAuthenticate={(token) => console.log("oauth token accessed.")}
            onAuthFailed={(data) => console.log("on auth failed:")}
            multiselect={true}
            navHidden={true}
            authImmediate={false}
            mimeTypes={["video/wmv", "video/webm", "video/mkv", "video/mp4"]}
            viewId={"DOCS"}
          >
            <FileInput
              type="button"
              label="video"
              subtext=" Add Video from Google Drive."
              src={this.state.video.url}
              inputtype="video"
              icon={this.state.video.icon}
              changed={this.previewVideo}
              preview={this.state.video.preview}
              required={true}
            />
          </GooglePicker>

          <FileInput
            type="file"
            label="thumbnail"
            subtext="Upload a picture that show what’s in your video. A good
                thumbnail draws viewer attention"
            src={this.state.image.url}
            alt="image"
            inputtype="image"
            icon={this.state.image.icon}
            changed={this.previewImage}
            accept="image/*"
            preview={this.state.image.preview}
            valid={this.state.image.valid}
            touched={this.state.image.touched}
          />

          <TextInput
            label="Description"
            type="text"
            inputtype="textarea"
            name="lectureDescription"
            onChange={this.descriptionChangeHandler}
            valid={this.state.description.valid ? 1 : 0}
            touched={this.state.description.touched ? 1 : 0}
            value={this.state.description.name}
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
    }
    return (
      <Fragment>
        {error ? (
          <ErrorModal error>Error!! Refresh and Try Again.</ErrorModal>
        ) : null}
        <div className={classes.ModalContainer}>
          <button
            className={classes.ModalCancelBtn}
            onClick={this.props.onCloseModal}
          >
            &times;
          </button>
          <h1 className={classes.ModalHeading}>Add Video Lecture</h1>
          {form}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editing: state.videoLec.editing,
    selectedPost: state.videoLec.editPost,
    data: state.videoLec.data,
    loading: state.videoLec.loading,
    error: state.videoLec.addVidError,
    teacherToken: state.auth.teacherToken,
    branches: state.lec.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => {
      dispatch(actionCreators.closeModal());
    },
    onSubmit: (editing, selectedPost, videoData, prevData, token) => {
      dispatch(
        actionCreators.submitVidLec(
          editing,
          selectedPost,
          videoData,
          prevData,
          token
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoLecture);
