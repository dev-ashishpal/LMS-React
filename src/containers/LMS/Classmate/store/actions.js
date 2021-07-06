import { userAgent } from "../../../../util/userAgent";

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
    dispatch(getClassmateStart());
    try {
      const res = await fetch(`http://${localhost}:8080/student/classmate/${branch}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await res.json();
      console.log(resData);
      dispatch(getClassmateSuccess(resData.student));
    } catch (err) {
      console.log(err);
      dispatch(getClassmateFail(err));
    }
  };
};
