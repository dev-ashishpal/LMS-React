import { userAgent } from "../../../../util/userAgent";
import { caughtError } from "../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const GET_CLASSMATE_START = "GET_CLASSMATE_START";
export const GET_CLASSMATE_SUCCESS = "GET_CLASSMATE_SUCCESS";
export const GET_CLASSMATE_FAIL = "GET_CLASSMATE_FAIL";

export const getClassmateStart = () => {
  return {
    type: GET_CLASSMATE_START,
  };
};
export const getClassmateSuccess = (data) => {
  return {
    type: GET_CLASSMATE_SUCCESS,
    data,
  };
};
export const getClassmateFail = (error) => {
  return {
    type: GET_CLASSMATE_FAIL,
    error,
  };
};

export const getClassmate = (token, branch) => {
  return async (dispatch) => {
    let ok;
    dispatch(getClassmateStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/student/classmate/${branch}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status !== 200) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error(resData.message);
      }
      dispatch(getClassmateSuccess(resData.student));
    } catch (err) {
      caughtError(dispatch, getClassmateFail, err);
    }
  };
};
