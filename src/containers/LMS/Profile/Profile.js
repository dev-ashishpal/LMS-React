import React, { Component } from "react";
import classes from "./Profile.module.css";
import image from "../../../assets/images/user-big.png";
import sprite from "../../../assets/svg/sprite.svg";
import Input from "../../../components/UI/ProfileInput/ProfileInput";
import SubmitButton from "../../../components/UI/SubmitBtn/SubmitBtn";
import { checkValidity } from "../../../util/validators";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import { generateBase64FromImage } from "../../../util/imagePreview";
import {userAgent} from "../../../util/userAgent";
import ErrorModal from "../../../components/UI/ErrorModal/ErrorModal";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.profileRef = React.createRef();
    this.profileMainRef = React.createRef();
  }
  state = {
    userForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
        },
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Phone Number",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isNumeric: true,
          minLength: 10,
          maxLength: 10,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true,
        },
      },
      github: {
        elementType: "input",
        elementConfig: {
          type: "github",
          placeholder: "Your Github Link",
        },
        value: "",
        valid: true,
        touched: true,
        validation: {
          // required: false,
          isUrl: true,
        },
      },
      linkedin: {
        elementType: "input",
        elementConfig: {
          type: "linkedin",
          placeholder: "Your LinkedIn Link",
        },
        value: "",
        valid: true,
        touched: true,
        validation: {
          // required: false,
          isUrl: true,
        },
      },
      portfolio: {
        elementType: "input",
        elementConfig: {
          type: "portfolio",
          placeholder: "Your Portfolio Link",
        },
        value: "",
        valid: true,
        touched: true,
        validation: {
          isUrl: true,
        },
      },
    },
    userImage: null,
    imageUrl: null,
    imagePath: null,
    formIsValid: false,
  };

  componentDidMount() {
    // localStorage.setItem('URL',window.location.pathname);
    // console.log(this.props.data);
    const updatedUserForm = { ...this.state.userForm };
    const name = { ...updatedUserForm.name };
    const email = { ...updatedUserForm.email };
    const phone = { ...updatedUserForm.phone };
    const imagePath = this.props.data.image ? this.props.data.image : null;
    name.value = this.props.data.name;
    email.value = this.props.data.email;
    phone.value = this.props.data.phone;
    if (name.value !== null) {
      name.valid = true;
    }
    if (email.value !== null) {
      email.valid = true;
    }
    if (phone.value !== null) {
      phone.valid = true;
    }

    if(this.props.studentToken) {
      const github = {...updatedUserForm.github};
      const linkedin = {...updatedUserForm.linkedin};
      const portfolio = {...updatedUserForm.portfolio};
      github.value = this.props.data.github;
      linkedin.value = this.props.data.linkedin;
      portfolio.value = this.props.data.portfolio;
      if(github.value !== null) {
        github.valid = true;
      }
      if(linkedin.value !== null) {
        linkedin.valid = true;
      }
      if(portfolio.value !== null) {
        portfolio.valid = true;
      }
      updatedUserForm.github = github;
      updatedUserForm.linkedin = linkedin;
      updatedUserForm.portfolio = portfolio;
    }
    updatedUserForm.name = name;
    updatedUserForm.email = email;
    updatedUserForm.phone = phone;
    // console.log(updatedUserForm.name);
    this.setState({ userForm: updatedUserForm, imagePath});
  }

  changedHandler = (event, inputIdentifier) => {
    const updatedUserForm = { ...this.state.userForm };
    const updatedFormElement = { ...updatedUserForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedUserForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedUserForm) {
      if (this.props.teacherToken) {
        if (
          inputIdentifier === "github" ||
          inputIdentifier === "linkedin" ||
          inputIdentifier === "portfolio"
        ) {
          continue;
        }
      }
      formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ userForm: updatedUserForm, formIsValid });
    // console.log(this.state.formIsValid);
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let name in this.state.userForm) {
      formData.append(`${name}`, this.state.userForm[name].value);
    }
    formData.append("image", this.state.imageUrl);
    formData.append("imagePath", this.state.imagePath);
    // console.log(formData);
    if (this.props.teacherToken) {
      this.props.onSubmit(formData, this.props.teacherToken, "teacher");
    } else if (this.props.studentToken) {
      this.props.onSubmit(formData, this.props.studentToken, "student");
    }
  };
  addImageHandler = (e) => {
    const imageUrl = e.target.files;
    generateBase64FromImage(imageUrl[0])
      .then((b64) => {
        this.setState({
          userImage: b64,
          imageUrl: imageUrl[0],
          formIsValid: true,
        });
      })
      .catch((err) => {
        this.setState({ userImage: null, formIsValid: true });
      });
  };

  render() {
    let localhost = "localhost";
    if (userAgent()) {
      localhost = "192.168.43.135";
    }

    const formElementArr = [];
    for (let key in this.state.userForm) {
      if (this.props.teacherToken) {
        if (key === "github" || key === "linkedin" || key === "portfolio") {
          continue;
        }
      }

      formElementArr.push({
        id: key,
        config: this.state.userForm[key],
      });
    }

    let profileImage;
    if (this.state.userImage !== null) {
      profileImage = this.state.userImage;
    } else if (this.state.imagePath !== null) {
      profileImage = "http://" + localhost + ":8080/" + this.state.imagePath;
    } else {
      profileImage = image;
    }

    let error = this.props.error;
    let sent = this.props.sent;
    // console.log(sent);
    return (
      <section className={classes.Profile}>
        {error ? <ErrorModal error>{error}</ErrorModal> : null}
        {sent ? <ErrorModal error={false}>{sent}</ErrorModal> : null}
        <div className={classes.ProfileSidebar} ref={this.profileRef}>
          <figure className={classes.ProfileImage}>
            <div className={classes.ImageInputBox}>
              <form className={classes.ImageInput}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.addImageHandler}
                />
                <svg>
                  <use href={sprite + "#icon-camera_alt"}></use>
                </svg>
              </form>
            </div>
            <img
              loading="lazy"
              decoding="async"
              src={profileImage}
              alt="user_image"
            />
          </figure>
        </div>
        <div className={classes.ProfileMain} ref={this.profileMainRef}>
          <div className={classes.ProfileMainHeader}>
            <h3>{this.state.userForm.name.value}</h3>
            <p>{this.state.userForm.email.value}</p>
          </div>
          <div className={classes.ProfileMainAbout}>
            <h2>About</h2>
            <div className={classes.HorizontalLine}>&nbsp;</div>
            <form className={classes.Form} onSubmit={this.submitHandler}>
              {formElementArr.map((element) => {
                const formClasses = [classes.FormInput];
                if (
                  !element.config.valid &&
                  element.config.touched &&
                  element.config.validation
                ) {
                  formClasses.push(classes.Invalid);
                }
                // console.log('here:',element.config.elementConfig);
                return (
                  <div key={element.id} className={formClasses.join(" ")}>
                    <Input
                      elementType={element.config.elementType}
                      elementConfig={element.config.elementConfig}
                      value={element.config.value}
                      label={element.id}
                      changed={(event) => {
                        this.changedHandler(event, element.id);
                      }}
                    />
                  </div>
                );
              })}
              <div className={classes.SubmitBtn}>
                <SubmitButton disabled={!this.state.formIsValid} />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacherToken: state.auth.teacherToken,
    studentToken: state.auth.studentToken,
    data: state.profile.data,
    error: state.profile.error,
    sent: state.profile.sent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onLoad: (token) => {dispatch(actionCreators.loadProfile(token))},
    onSubmit: (profileData, token, url) => {
      dispatch(actionCreators.postProfile(profileData, token, url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
