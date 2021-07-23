import React, { Fragment } from "react";
import classes from "../StreamLecture.module.css";
import TextInput from "../../../../components/UI/Input/TextInput/TextInput";
import PropTypes from "prop-types";

const streamComment = (props) => {
  const {
    localhost,
    userData,
    comment,
    formIsValid,
    onChange,
    onSubmit,
  } = props;
  return (
    <Fragment>
      <h1 className={classes.CommentBoxHeading}>Comments</h1>
      <div className={classes.CommentBoxUser}>
        <figure>
          <img
            src={`http://${localhost}:8080/${userData.image}`}
            alt="your profile Pic"
          />
        </figure>
        <form onSubmit={onSubmit} className={classes.CommentForm}>
          <label htmlFor="add-comment" hidden>
            Add New Comment
          </label>
          <TextInput
            label=" "
            type="text"
            inputtype="textarea"
            name="lectureDescription"
            onChange={onChange}
            valid={comment.valid ? 1 : 0}
            touched={comment.touched ? 1 : 0}
            value={comment.msg}
          />
          <div className={classes.CommentFormSubmit}>
            <button type="submit" disabled={!formIsValid}>
              Publish
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

streamComment.propTypes = {
  formIsValid: PropTypes.bool,
  comment: PropTypes.object,
  userData: PropTypes.object,
  localhost: PropTypes.string,

  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default streamComment;
