import { userAgent } from "../../../../../util/userAgent";
import { caughtError } from "../../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_PAPER_LEC_START = "LOAD_PAPER_LEC_START";
export const LOAD_PAPER_LEC_SUCCESS = "LOAD_PAPER_LEC_SUCCESS";
export const LOAD_PAPER_LEC_FAIL = "LOAD_PAPER_LEC_FAIL";

export const EDIT_PAPER_LEC_SUCCESS = "EDIT_PAPER_LEC_SUCCESS";

export const SUBMIT_PAPER_LEC_START = "SUBMIT_PAPER_LEC_START";
export const SUBMIT_PAPER_LEC_SUCCESS = "SUBMIT_PAPER_LEC_SUCCESS";
export const SUBMIT_PAPER_LEC_FAIL = "SUBMIT_PAPER_LEC_FAIL";

export const SHOW_MODAL = "SHOW_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const showModal = () => {
  return {
    type: SHOW_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const loadPaperLecStart = () => {
  return {
    type: LOAD_PAPER_LEC_START,
  };
};

export const loadPaperLecSuccess = (data) => {
  return {
    type: LOAD_PAPER_LEC_SUCCESS,
    data,
  };
};

export const loadPaperLecFail = (error) => {
  return {
    type: LOAD_PAPER_LEC_FAIL,
    error,
  };
};

export const loadPaperLec = (token, url) => {
  return async (dispatch) => {
    dispatch(loadPaperLecStart());
    try {
      const res = await fetch(`http://${localhost}:8080${url}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await res.json();
      // console.log(resData);
      dispatch(loadPaperLecSuccess(resData.data));
    } catch (err) {
      dispatch(loadPaperLecFail(err));
    }
  };
};

export const deletePaperLec = (_id, prevData, token) => {
  return async (dispatch) => {
    let ok;
    try {
      const res = await fetch(
        `http://${localhost}:8080/teacher/lecture/paper/${_id}`,
        {
          method: "DELETE",
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
        throw new Error("Paper Not Deleted!");
      }

      console.log(resData);
      const updatedPaper = prevData.filter((pp) => pp._id !== _id);
      dispatch(loadPaperLecSuccess(updatedPaper));
    } catch (err) {
      caughtError(dispatch, loadPaperLecFail, err);
    }
  };
};

export const submitPaperLecStart = () => {
  return {
    type: SUBMIT_PAPER_LEC_START,
  };
};

export const submitPaperLecSuccess = (data) => {
  return {
    type: SUBMIT_PAPER_LEC_SUCCESS,
    data,
  };
};

export const submitPaperLec = (paperData, token) => {
  return async (dispatch) => {
    let ok;
    dispatch(submitPaperLecStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/teacher/lecture/paper`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: paperData,
        }
      );
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error(resData.message);
      }
      dispatch(submitPaperLecSuccess(resData.data));
      dispatch(closeModal());
    } catch (err) {
      caughtError(dispatch, loadPaperLecFail, err);
    }
  };
};
