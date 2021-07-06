import { userAgent } from "../../../../util/userAgent";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_VIDEO_SUCCESS = "LOAD_VIDEO_SUCCESS";
export const LOAD_VIDEO_FAIL = "LOAD_VIDEO_FAIL";
export const LOAD_VIDEO_START = "LOAD_VIDEO_START";

export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAIL = "LOAD_COMMENT_FAIL";
export const LOAD_COMMENT_START = "LOAD_COMMENT_START";

export const ADD_COMMENT = "ADD_COMMENT";

export const loadVideoStart = () => {
  return {
    type: LOAD_VIDEO_START,
  };
};

export const loadVideoSuccess = (data) => {
  return {
    type: LOAD_VIDEO_SUCCESS,
    data,
  };
};

export const loadVideoFail = (error) => {
  return {
    type: LOAD_VIDEO_FAIL,
    error,
  };
};

export const loadVideo = (_id, token, url) => {
  return (dispatch) => {
    dispatch(loadVideoStart());
    // console.log('[stream]',url,_id);
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
        // console.log(resData);
        dispatch(loadVideoSuccess(resData.data));
      })
      .catch((err) => {
        dispatch(loadVideoFail(err));
      });
  };
};

export const postComment = (token, url, videoId, commentData) => {
  return (dispatch) => {
    fetch(`http://${localhost}:8080/${url}/lecture/video/comment/${videoId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loadCommentStart = () => {
  return {
    type: LOAD_COMMENT_START,
  };
};

export const loadCommentSuccess = (data) => {
  return {
    type: LOAD_COMMENT_SUCCESS,
    data,
  };
};

export const loadCommentFail = (error) => {
  return {
    type: LOAD_COMMENT_FAIL,
    error,
  };
};

export const loadComments = (localhost, token, url, videoId) => {
  return async (dispatch) => {
    dispatch(loadCommentStart());
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
      dispatch(loadCommentSuccess(commentData));
      // this.setState({ commentData });
    } catch (err) {
      console.log(err);
      dispatch(loadCommentFail(err));
    }
  };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment: comment,
  };
};

export const deleteComment = (_id, token, url, commentData) => {
  return async (dispatch) => {
    console.log('id of comment',_id);
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
      const resData = await res.json();
      let updatedComments = [...commentData];
      updatedComments = updatedComments.filter((cmt) => cmt._id !== _id);
      console.log('updatedComments', updatedComments);
      dispatch(loadCommentSuccess(updatedComments));

      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };
};
