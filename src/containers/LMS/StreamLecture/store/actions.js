import { userAgent } from "../../../../util/userAgent";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_VIDEO_SUCCESS = "LOAD_VIDEO_SUCCESS";
export const LOAD_VIDEO_FAIL = "LOAD_VIDEO_FAIL";
export const LOAD_VIDEO_START = "LOAD_VIDEO_START";
export const EMPTY_COMMENT_BOX = "EMPTY_COMMENT_BOX";

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

export const emptyCommentBox = () => {
  return {
    type: EMPTY_COMMENT_BOX,
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
        dispatch(emptyCommentBox());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
