import * as actionTypes from "./actionTypes";
import { userAgent } from "../../util/userAgent";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const getBranchesSuccess = (branches) => {
  return {
    type: actionTypes.GET_BRANCHES_SUCCESS,
    branches,
  };
};

export const getBranches = (token, url) => {
  return (dispatch) => {
    fetch(`http://${localhost}:8080/${url}/lecture/branches`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (url === "teacher") {
          let options = [];
          data.branches.map((branch) => options.push({ value: branch }));
          dispatch(getBranchesSuccess(options));
          // console.log("options", options);
        } else if (url === "student") {
          dispatch(getBranchesSuccess(data.branches));
          // console.log("branches", data.branches);
        }
      });
  };
};

export const studentVideosStart = () => {
  return {
    type: actionTypes.STUDENT_VIDEOS_START,
  };
};

export const studentVideosSuccess = (data) => {
  return {
    type: actionTypes.STUDENT_VIDEOS_SUCCESS,
    data,
  };
};
export const studentVideosFail = (error) => {
  return {
    type: actionTypes.STUDENT_VIDEOS_FAIL,
    error,
  };
};

export const studentVideos = (token) => {
  return (dispatch) => {
    dispatch(studentVideosStart());
    fetch(`http://${localhost}:8080/student/lecture/all-video`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(studentVideosSuccess(resData.data));
      })
      .catch((err) => {
        dispatch(studentVideosFail(err));
      });
  };
};
