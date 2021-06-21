import { userAgent } from "../../../../util/userAgent";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_BRANCHES_START = "LOAD_BRANCHES_START";
export const LOAD_BRANCHES_SUCCESS = "LOAD_BRANCHES_SUCCESS";
export const LOAD_BRANCHES_FAIL = "LOAD_BRANCHES_FAIL";
export const GET_GIPHY_START = "GET_GIPHY_START";
export const GET_GIPHY_SUCCESS = "GET_GIPHY_SUCCESS";
export const GET_GIPHY_FAIL = "LOAD_BRANCHES_FAIL";

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
  return (dispatch) => {
    dispatch(loadBranchesStart());
    fetch(`http://${localhost}:8080/${url}/message-metadata`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log(resData.data);
        dispatch(loadBranchesSuccess(resData.data));
      })
      .catch((err) => {
        dispatch(loadBranchesFail(err));
      });
  };
};

export const postMessage = (token, url, branch, subject, messageData) => {
  return (dispatch) => {
    fetch(`http://${localhost}:8080/${url}/message/${branch}/${subject}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log("[Msg action.js]", resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const postImgMessage = (token, url, branch, subject, messageData) => {
  return (dispatch) => {
    fetch(`http://${localhost}:8080/${url}/message-img/${branch}/${subject}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: messageData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log("[Msg image]", resData);
      })
      .catch((err) => {
        console.log(err);
      });
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
  return (dispatch) => {
    dispatch(getGiphyStart());
    fetch(
      "https://api.giphy.com/v1/" +
        url +
        "/trending?api_key=UUruCcuAfSJWTQKIkucRAZWXnYFirols&limit=50",
      { method: "GET" }
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        dispatch(getGiphySuccess(resData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getGiphyFail(err));
      });
  };
};
