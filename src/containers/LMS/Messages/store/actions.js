export const LOAD_BRANCHES_START = "LOAD_BRANCHES_START";
export const LOAD_BRANCHES_SUCCESS = "LOAD_BRANCHES_SUCCESS";
export const LOAD_BRANCHES_FAIL = "LOAD_BRANCHES_FAIL";

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
    fetch("http://localhost:8080/" + url +"/message-metadata", {
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
