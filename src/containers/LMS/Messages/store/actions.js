import { userAgent } from "../../../../util/userAgent";
import { REACT_APP_GIPHY_API_KEY } from "../../../../util/env";
import { caughtError } from "../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_BRANCHES_START = "LOAD_BRANCHES_START";
export const LOAD_BRANCHES_SUCCESS = "LOAD_BRANCHES_SUCCESS";
export const LOAD_BRANCHES_FAIL = "LOAD_BRANCHES_FAIL";

export const GET_GIPHY_START = "GET_GIPHY_START";
export const GET_GIPHY_SUCCESS = "GET_GIPHY_SUCCESS";
export const GET_GIPHY_FAIL = "GET_GIPHY_FAIL";

export const GET_MESSAGE_START = "GET_MESSAGE_START";
export const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
export const GET_MESSAGE_FAIL = "GET_MESSAGE_FAIL";

export const POST_MESSAGE_START = "POST_MESSAGE_START";
export const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS";
export const POST_MESSAGE_FAIL = "POST_MESSAGE_FAIL";

export const ADD_MESSAGE = "ADD_MESSAGE";

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

export const loadBranchesStart = () => {
  return {
    type: LOAD_BRANCHES_START,
  };
};

export const loadBranchesSuccess = (data) => {
  return {
    type: LOAD_BRANCHES_SUCCESS,
    data,
  };
};

export const loadBranchesFail = (error) => {
  return {
    type: LOAD_BRANCHES_FAIL,
    error,
  };
};

export const loadBranches = (token, url) => {
  return async (dispatch) => {
    dispatch(loadBranchesStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/message-metadata`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await res.json();
      dispatch(loadBranchesSuccess(resData.data));
    } catch (err) {
      dispatch(loadBranchesFail(err));
    }
  };
};

export const getMessageStart = () => {
  return {
    type: GET_MESSAGE_START,
  };
};

export const getMessageSuccess = (data) => {
  return {
    type: GET_MESSAGE_SUCCESS,
    data,
  };
};

export const getMessageFail = (error) => {
  return {
    type: GET_MESSAGE_FAIL,
    error,
  };
};

export const getMessage = (url, branch, subject, token) => {
  return async (dispatch) => {
    dispatch(getMessageStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/message/${branch}/${subject}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        }
      );
      const resData = await res.json();
      dispatch(getMessageSuccess(resData.data));
    } catch (err) {
      dispatch(getMessageFail(err));
    }
  };
};

export const postMessageStart = () => {
  return {
    type: POST_MESSAGE_START,
  };
};

export const postMessageSuccess = () => {
  return {
    type: POST_MESSAGE_SUCCESS,
  };
};

export const postMessageFail = (error) => {
  return {
    type: POST_MESSAGE_FAIL,
    error,
  };
};

export const postMessage = (token, url, branch, subject, messageData) => {
  return async (dispatch) => {
    try {
      let ok;
      dispatch(postMessageStart());
      const res = await fetch(
        `http://${localhost}:8080/${url}/message/${branch}/${subject}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();
      dispatch(postMessageSuccess());
      if (ok === false) {
        throw new Error(resData.message);
      }
    } catch (err) {
      caughtError(dispatch, postMessageFail, err);
    }
  };
};

export const postImgMessage = (token, url, branch, subject, messageData) => {
  return async (dispatch) => {
    let ok;
    dispatch(postMessageStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/message-img/${branch}/${subject}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: messageData,
        }
      );
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();
      dispatch(postMessageSuccess)
      if (ok === false) {
        throw new Error(resData.message);
      }
    } catch (err) {
      caughtError(dispatch, postMessageFail, err);
    }
  };
};

export const getGiphyStart = () => {
  return {
    type: GET_GIPHY_START,
  };
};

export const getGiphySuccess = (data) => {
  return {
    type: GET_GIPHY_SUCCESS,
    data,
  };
};

export const getGiphyFail = (error) => {
  return {
    type: GET_GIPHY_FAIL,
    error,
  };
};

export const getGiphyTrending = (url) => {
  return async (dispatch) => {
    dispatch(getGiphyStart());
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/${url}/trending?api_key=${REACT_APP_GIPHY_API_KEY}&limit=50`,
        { method: "GET" }
      );
      const resData = await res.json();
      dispatch(getGiphySuccess(resData));
    } catch (err) {
      dispatch(getGiphyFail(err));
    }
  };
};
