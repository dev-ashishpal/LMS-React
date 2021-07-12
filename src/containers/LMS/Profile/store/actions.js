import { userAgent } from "../../../../util/userAgent";
import { caughtError } from "../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_PROFILE_START = "LOAD_PROFILE_START";
export const LOAD_PROFILE_SUCCESS = "LOAD_PROFILE_SUCCESS";
export const LOAD_PROFILE_FAIL = "LOAD_PROFILE_FAIL";

export const SENT_PROFILE = "SENT_PROFILE";

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
export const sentProfile = (sent) => {
  return {
    type: SENT_PROFILE,
    sent,
  };
};

export const loadProfile = (token, url) => {
  return async (dispatch) => {
    dispatch(loadProfileStart());
    try {
      const res = await fetch(`http://${localhost}:8080/${url}/profile`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await res.json();
      dispatch(loadProfileSuccess(resData.data));
    } catch (err) {
      dispatch(loadProfileFail(err));
    }
  };
};

export const postProfile = (profileData, token, url) => {
  return async (dispatch) => {
    let ok;
    try {
      const res = await fetch(`http://${localhost}:8080/${url}/profile`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: profileData,
      });
      if (res.status !== 200) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error(resData.message);
      }
      caughtError(dispatch, sentProfile, resData);
      dispatch(loadProfile(token, url));

    } catch (err) {
      caughtError(dispatch, loadProfileFail, err);
    }
  };
};
