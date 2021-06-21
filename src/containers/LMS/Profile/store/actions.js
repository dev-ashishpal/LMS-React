import {userAgent} from "../../../../util/userAgent";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_PROFILE_START = "LOAD_PROFILE_START";
export const LOAD_PROFILE_SUCCESS = "LOAD_PROFILE_SUCCESS";
export const LOAD_PROFILE_FAIL = "LOAD_PROFILE_FAIL";

export const loadProfileStart = () => {
  return {
    type: LOAD_PROFILE_START,
  };
};

export const loadProfileSuccess = (data) => {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data,
  };
};

export const loadProfileFail = (error) => {
  return {
    type: LOAD_PROFILE_FAIL,
    error,
  };
};

export const loadProfile = (token, url) => {
  return (dispatch) => {
    dispatch(loadProfileStart());
    fetch(`http://${localhost}:8080/${url}/profile`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log('[Profile]',resData);
        dispatch(loadProfileSuccess(resData.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const postProfile = (profileData, token, url) => {
  return (dispatch) => {
    fetch(`http://${localhost}:8080/${url}/profile`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: profileData,
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
