import { userAgent } from "../../../../util/userAgent";
import { caughtError } from "../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
export const GET_VIDEO_FAIL = "GET_VIDEO_FAIL";
export const GET_VIDEO_START = "GET_VIDEO_START";

export const GET_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS";
export const GET_COMMENT_FAIL = "GET_COMMENT_FAIL";
export const GET_COMMENT_START = "GET_COMMENT_START";

export const ADD_COMMENT = "ADD_COMMENT";

export const DELETE_COMMENT_START = "DELETE_COMMENT_START";
export const DELETE_COMMENT_FAIL = "DELETE_COMMENT_FAIL";

export const POST_COMMENT_START = "POST_COMMENT_START";
export const POST_COMMENT_FAIL = "POST_COMMENT_FAIL";

export const getVideoStart = () => {
  return {
    type: GET_VIDEO_START,
  };
};

export const getVideoSuccess = (data) => {
  return {
    type: GET_VIDEO_SUCCESS,
    data,
  };
};

export const getVideoFail = (error) => {
  return {
    type: GET_VIDEO_FAIL,
    error,
  };
};

export const getVideo = (_id, token, url) => {
  return (dispatch) => {
    dispatch(getVideoStart());
    fetch(`http://${localhost}:8080/${url}/lecture/video/${_id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(getVideoSuccess(resData.data));
      })
      .catch((err) => {
        dispatch(getVideoFail(err));
      });
  };
};

export const postCommentStart = () => {
  return {
    type: POST_COMMENT_START,
  };
};

export const postCommentFail = (error) => {
  return {
    type: POST_COMMENT_FAIL,
    error,
  };
};

export const postComment = (token, url, videoId, commentData) => {
  return async (dispatch) => {
    dispatch(postCommentStart());
    try {
      let ok;
      const res = await fetch(
        `http://${localhost}:8080/${url}/lecture/video/comment/${videoId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );
      if (res.status !== 201) {
        ok = res.ok;
      }

      const resData = await res.json();
      if (ok === false) {
        throw new Error(resData.message);
      }
    } catch (err) {
      caughtError(dispatch, postCommentFail, err);
    }
  };
};

export const getCommentStart = () => {
  return {
    type: GET_COMMENT_START,
  };
};

export const getCommentSuccess = (data) => {
  return {
    type: GET_COMMENT_SUCCESS,
    data,
  };
};

export const getCommentFail = (error) => {
  return {
    type: GET_COMMENT_FAIL,
    error,
  };
};

export const getComments = (localhost, token, url, videoId) => {
  return async (dispatch) => {
    dispatch(getCommentStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/lecture/video/comment/${videoId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await res.json();

      const commentData = resData.data.reverse();
      dispatch(getCommentSuccess(commentData));
    } catch (err) {
      dispatch(getCommentFail(err));
    }
  };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment: comment,
  };
};

export const deleteCommentStart = () => {
  return {
    type: DELETE_COMMENT_START,
  };
};

export const deleteCommentFail = (error) => {
  return {
    type: DELETE_COMMENT_FAIL,
    error,
  };
};

export const deleteComment = (_id, token, url, commentData) => {
  return async (dispatch) => {
    dispatch(deleteCommentStart());
    let ok;
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/lecture/video/comment/${_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        }
      );
      if (res.status !== 200) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error(resData.message);
      }
      let updatedComments = [...commentData];
      updatedComments = updatedComments.filter((cmt) => cmt._id !== _id);
      dispatch(getCommentSuccess(updatedComments));
    } catch (err) {
      caughtError(dispatch, deleteCommentFail, err);
    }
  };
};
