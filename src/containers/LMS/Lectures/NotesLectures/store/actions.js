import { userAgent } from "../../../../../util/userAgent";
import { caughtError } from "../../../../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const LOAD_NOTES_LEC_START = "LOAD_NOTES_LEC_START";
export const LOAD_NOTES_LEC_SUCCESS = "LOAD_NOTES_LEC_SUCCESS";
export const LOAD_NOTES_LEC_FAIL = "LOAD_NOTES_LEC_FAIL";

// export const PAGINATE_NOTES_LEC_START = "PAGINATE_NOTES_LEC_START";
// export const PAGINATE_NOTES_LEC_SUCCESS = "PAGINATE_NOTES_LEC_SUCCESS";
// export const PAGINATE_NOTES_LEC_FAIL = "PAGINATE_NOTES_LEC_FAIL";

export const SUBMIT_NOTES_LEC_START = "SUBMIT_NOTES_LEC_START";
export const SUBMIT_NOTES_LEC_SUCCESS = "SUBMIT_NOTES_LEC_SUCCESS";
export const SUBMIT_NOTES_LEC_FAIL = "SUBMIT_NOTES_LEC_FAIL";

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

export const loadNotesLecStart = () => {
  return {
    type: LOAD_NOTES_LEC_START,
  };
};

export const loadNotesLecSuccess = (data) => {
  return {
    type: LOAD_NOTES_LEC_SUCCESS,
    data,
  };
};

export const loadNotesLecFail = (error) => {
  return {
    type: LOAD_NOTES_LEC_FAIL,
    error,
  };
};

export const loadNotesLec = (token, url) => {
  return async (dispatch) => {
    dispatch(loadNotesLecStart());
    try {
      const res = await fetch(`http://${localhost}:8080${url}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await res.json();
      dispatch(loadNotesLecSuccess(resData.data));
    } catch (err) {
      dispatch(loadNotesLecFail(err));
    }
  };
};

// export const paginateNotesLecStart = () => {
//   return {
//     type: PAGINATE_NOTES_LEC_START,
//   };
// };

// export const paginateNotesLecSuccess = (data) => {
//   return {
//     type: PAGINATE_NOTES_LEC_SUCCESS,
//     data,
//   };
// };

// export const paginateNotesLecFail = (error) => {
//   return {
//     type: PAGINATE_NOTES_LEC_FAIL,
//     error,
//   };
// };

// export const paginateNotesLec = (token, url, page) => {
//   return (dispatch) => {
//     dispatch(paginateNotesLecStart());
//     fetch(`http://${localhost}:8080${url}?page=${page}`, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((resData) => {
//         dispatch(paginateNotesLecSuccess(resData.data));
//       })
//       .catch((err) => {
//         dispatch(paginateNotesLecFail(err));
//       });
//   };
// };

export const deleteNotesLec = (_id, prevData, token) => {
  return async (dispatch) => {
    let ok;
    try {
      const res = await fetch(
        `http://${localhost}:8080/teacher/lecture/book/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      if (res.status !== 200) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error("Notes not Deleted!");
      }
      const updatedNotes = prevData.filter((bk) => bk._id !== _id);
      dispatch(loadNotesLecSuccess(updatedNotes));
    } catch (err) {
      caughtError(dispatch, loadNotesLecFail, err);
    }
  };
};

export const submitNotesLecStart = () => {
  return {
    type: SUBMIT_NOTES_LEC_START,
  };
};

export const submitNotesLecSuccess = (data) => {
  return {
    type: SUBMIT_NOTES_LEC_SUCCESS,
    data,
  };
};

export const submitNotesLecFail = (error) => {
  return {
    type: SUBMIT_NOTES_LEC_FAIL,
    error,
  }
}

export const submitNotesLec = (notesData, token) => {
  return async (dispatch) => {
    let ok;
    try {
      const res = await fetch(`http://${localhost}:8080/teacher/lecture/book`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: notesData,
      });
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();
      if (ok === false) {
        throw new Error(resData.message);
      }
      dispatch(submitNotesLecSuccess(resData.data));
      dispatch(closeModal());
    } catch (err) {
      caughtError(dispatch, submitNotesLecFail, err);
    }
  };
};
