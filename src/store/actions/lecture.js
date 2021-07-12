import * as actionTypes from "./actionTypes";
import { userAgent } from "../../util/userAgent";
import { caughtError } from "../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const getBranchesStart = () => {
  return {
    type: actionTypes.GET_BRANCHES_START,
  };
};

export const getBranchesSuccess = (branches) => {
  return {
    type: actionTypes.GET_BRANCHES_SUCCESS,
    branches,
  };
};

export const getBranchesFail = (error) => {
  return {
    type: actionTypes.GET_BRANCHES_FAIL,
    error,
  };
};

export const getBranches = (token, url) => {
  return async (dispatch) => {
    dispatch(getBranchesStart());
    let ok;
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/lecture/branches`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "GET",
        }
      );
      if (res.status !== 200) {
        ok = res.ok;
      }
      const resData = await res.json();

      if (ok === false) {
        throw new Error("Failed to fetch Branches. Try to refresh.");
      }

      if (url === "teacher") {
        let options = [];
        resData.branches.map((branch) => options.push({ value: branch }));
        dispatch(getBranchesSuccess(options));
      } else if (url === "student") {
        dispatch(getBranchesSuccess(resData.branches));
      }
    } catch (err) {
      caughtError(dispatch, getBranchesFail, err);
    }
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
  return async (dispatch) => {
    dispatch(studentVideosStart());
    let ok;
    try {
      const res = await fetch(
        `http://${localhost}:8080/student/lecture/all-video`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "GET",
        }
      );
      if(res.status !== 200 ) {
        ok = res.ok;
      }
      const resData = await res.json();
      if(ok === false) {
        throw new Error("Subjects are not fetched. Load Again!!")
      }
      dispatch(studentVideosSuccess(resData.data));
    } catch (err) {
      caughtError(dispatch, studentVideosFail, err);
    }
  };
};
