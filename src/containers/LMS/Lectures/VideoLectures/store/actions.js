import { userAgent } from "../../../../../util/userAgent";
import { caughtError } from "../../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_VID_LEC_START = "LOAD_VID_LEC_START";
export const LOAD_VID_LEC_SUCCESS = "LOAD_VID_LEC_SUCCESS";
export const LOAD_VID_LEC_FAIL = "LOAD_VID_LEC_FAIL";

export const EDIT_VID_LEC_SUCCESS = "EDIT_VID_LEC_SUCCESS";

export const SUBMIT_VID_LEC_START = "SUBMIT_VID_LEC_START";
export const SUBMIT_VID_LEC_SUCCESS = "SUBMIT_VID_LEC_SUCCESS";
export const SUBMIT_VID_LEC_FAIL = "SUBMIT_VID_LEC_FAIL";

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

export const loadVidLecStart = () => {
  return {
    type: LOAD_VID_LEC_START,
  };
};

export const loadVidLecSuccess = (data) => {
  return {
    type: LOAD_VID_LEC_SUCCESS,
    data,
  };
};

export const loadVidLecFail = (error) => {
  return {
    type: LOAD_VID_LEC_FAIL,
    error,
  };
};

export const loadVidLec = (token, url) => {
  return async (dispatch) => {
    dispatch(loadVidLecStart());
    try {
      const res = await fetch(`http://${localhost}:8080${url}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await res.json();
      dispatch(loadVidLecSuccess(resData.data));
    } catch (err) {
      dispatch(loadVidLecFail(err));
    }
  };
};

export const editVidLecSuccess = (editPost) => {
  return {
    type: EDIT_VID_LEC_SUCCESS,
    editPost,
  };
};

export const editVidLec = (_id, data) => {
  return (dispatch) => {
    const editPost = data.find((lec) => lec._id === _id);
    dispatch(editVidLecSuccess(editPost));
  };
};

export const submitVidLecSuccess = (data) => {
  return {
    type: SUBMIT_VID_LEC_SUCCESS,
    data,
  };
};

export const submitVidLecFail = (error) => {
  return {
    type: SUBMIT_VID_LEC_FAIL,
    error,
  };
};

export const submitVidLecStart = () => {
  return {
    type: SUBMIT_VID_LEC_START,
  };
};

export const deleteVidLec = (_id, data, token) => {
  return async (dispatch) => {
    let ok;
    try {
      const res = await fetch(
        `http://${localhost}:8080/teacher/lecture/video/${_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        }
      );
      if (res.status !== 200) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error("Not Deleted, some error occurred");
      }
      const updatedLectures = data.filter((lec) => lec._id !== _id);
      dispatch(loadVidLecSuccess(updatedLectures));
    } catch (err) {
      caughtError(dispatch, loadVidLecFail, err);
    }
  };
};

export const submitVidLec = (
  editing,
  selectedPost,
  videoData,
  prevData,
  token
) => {
  return async (dispatch) => {
    let ok, editOk;
    dispatch(submitVidLecStart());
    if (editing) {
      try {
        const res = await fetch(
          `http://${localhost}:8080/teacher/lecture/video/${selectedPost._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: videoData,
          }
        );
        if (res.status !== 201) {
          editOk = res.ok;
        }
        const resData = await res.json();

        if (editOk === false) {
          throw new Error(resData.message);
        }
        const updatedData = prevData.filter(
          (lec) => lec._id !== selectedPost._id
        );
        dispatch(loadVidLecSuccess(updatedData));
        dispatch(submitVidLecSuccess(resData.data));
        dispatch(closeModal());
      } catch (err) {
        caughtError(dispatch, submitVidLecFail, err);
      }
    } else {
      try {
        const res = await fetch(
          `http://${localhost}:8080/teacher/lecture/video`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: videoData,
          }
        );
        if (res.status !== 201) {
          ok = res.ok;
        }
        const resData = await res.json();

        if (ok === false) {
          throw new Error(resData.message);
        }
        dispatch(submitVidLecSuccess(resData.data));
        dispatch(closeModal());
      } catch (err) {
        caughtError(dispatch, submitVidLecFail, err);
      }
    }
  };
};