import {userAgent} from "../../../../../util/userAgent";

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

export const WATCHLIST_SUCCESS = 'WATCHLIST_SUCCESS';

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

export const loadVidLecStart = () => {
  return {
    type: LOAD_VID_LEC_START,
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
    console.log(editPost);
    dispatch(editVidLecSuccess(editPost));
  };
};

export const submitVidLecSuccess = (data) => {
  return {
    type: SUBMIT_VID_LEC_SUCCESS,
    data,
  };
};

export const submitVidLecFail = () => {
  return {
    type: SUBMIT_VID_LEC_FAIL,
  };
};

export const submitVidLecStart = () => {
  return {
    type: SUBMIT_VID_LEC_START,
  };
};

export const loadVidLec = (token, url) => {
  return (dispatch) => {
    dispatch(loadVidLecStart());
    fetch(`http://${localhost}:8080${url}`, {
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
        dispatch(loadVidLecSuccess(resData.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadVidLecFail(err));
      });
  };
};

export const deleteVidLec = (_id, data, token) => {
  return (dispatch) => {
    console.log(data);
    fetch(`http://${localhost}:8080/teacher/lecture/video/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        const updatedLectures = data.filter((lec) => lec._id !== _id);
        dispatch(loadVidLecSuccess(updatedLectures));
        console.log(result);
      });
  };
};

export const submitVidLec = (
  editing,
  selectedPost,
  videoData,
  prevData,
  token
) => {
  return (dispatch) => {
    let ok,editOk;
    dispatch(submitVidLecStart());
    if (editing) {
      console.log(videoData);
      fetch(`http://${localhost}:8080/teacher/lecture/video/${selectedPost._id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: videoData,
      })
        .then((res) => {
          if(res.status !== 201) {
            editOk = res.ok;
          }
          return res.json();
        })
        .then((resData) => {
          if(editOk === false) {
            throw new Error(resData.message);
          }
          const updatedData = prevData.filter(
            (lec) => lec._id !== selectedPost._id
          );
          dispatch(loadVidLecSuccess(updatedData));
          // console.log(resData);
          dispatch(submitVidLecSuccess(resData.data));
          dispatch(closeModal());
        })
        .catch((err) => {
          dispatch(loadVidLecFail(err.message));
          dispatch(submitVidLecFail());
        });
    } else {
      fetch(`http://${localhost}:8080/teacher/lecture/video`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: videoData,
      })
        .then((res) => {
          if(res.status !== 201) {
            ok = res.ok;
          }
          return res.json();
        })
        .then((resData) => {
          if(ok === false) {
            throw new Error(resData.message);
          }
          // console.log(resData);
          dispatch(submitVidLecSuccess(resData.data));
          dispatch(closeModal());
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(submitVidLecFail(err.message));
        });
    }
  };
};

export const watchlistSuccess = (data) => {
  return {
    type: WATCHLIST_SUCCESS,
    data
  }
}


// export const getWatchlist = (token) => {
//   return dispatch => {
//     fetch('http://localhost:8080/student/lecture/video/watchlist', {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }).then(res => {
//       return res.json();
//     }).then(resData => {
//       console.log(resData);
//       dispatch(watchlistSuccess(resData.data));
//     }).catch(err => {
//       console.log(err);
//     })
//   }
// }

export const watchlist = (_id, token) => {
  return dispatch => {
  fetch('http://localhost:8080/student/lecture/video/add-watchlist/' + _id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(res => {
    return res.json();
  }).then(resData => {
    console.log(resData);
    dispatch(watchlistSuccess(resData.data));
  }).catch(err => {
    console.log(err);
  })
  }
}