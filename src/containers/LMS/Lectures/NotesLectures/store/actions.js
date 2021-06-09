export const LOAD_NOTES_LEC_START = "LOAD_NOTES_LEC_START";
export const LOAD_NOTES_LEC_SUCCESS = "LOAD_NOTES_LEC_SUCCESS";
export const LOAD_NOTES_LEC_FAIL = "LOAD_NOTES_LEC_FAIL";

export const EDIT_NOTES_LEC_SUCCESS = "EDIT_NOTES_LEC_SUCCESS";

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
  return (dispatch) => {
    dispatch(loadNotesLecStart());
    fetch("http://localhost:8080" + url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(loadNotesLecSuccess(resData.data));
        // console.log(resData);
      })
      .catch((err) => {
        dispatch(loadNotesLecFail(err));
      });
  };
};

export const deleteNotesLec = (_id, prevData, token) => {
  return (dispatch) => {
    fetch('http://localhost:8080/teacher/lecture/book/' + _id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(res => {
      return res.json();
    }).then(resData => {
      console.log(resData);
      const updatedNotes = prevData.filter(bk => bk._id !== _id);
      dispatch(loadNotesLecSuccess(updatedNotes));
    }).catch(err => {
      dispatch(loadNotesLecFail(err));
    })
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

export const submitNotesLec = (notesData, token) => {
  return (dispatch) => {
    fetch("http://localhost:8080/teacher/lecture/book", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: notesData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(submitNotesLecSuccess(resData.data));
        dispatch(closeModal());
      })
      .catch((err) => {
        dispatch(loadNotesLecFail(err));
      });
  };
};