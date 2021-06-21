import { userAgent } from "../../../../util/userAgent";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const DASHBOARD_DATA_START = "DASHBOARD_DATA_START";
export const DASHBOARD_DATA_SUCCESS = "DASHBOARD_DATA_SUCCESS";
export const DASHBOARD_DATA_FAIL = "DASHBOARD_DATA_FAIL";

export const DASHBOARD_VIDEO_DATA_START = "DASHBOARD_VIDEO_DATA_START";
export const DASHBOARD_VIDEO_DATA_SUCCESS = "DASHBOARD_VIDEO_DATA_SUCCESS";
export const DASHBOARD_VIDEO_DATA_FAIL = "DASHBOARD_VIDEO_DATA_FAIL";

export const DASHBOARD_PAPER_DATA_START = "DASHBOARD_PAPER_DATA_START";
export const DASHBOARD_PAPER_DATA_SUCCESS = "DASHBOARD_PAPER_DATA_SUCCESS";
export const DASHBOARD_PAPER_DATA_FAIL = "DASHBOARD_PAPER_DATA_FAIL";

export const DASHBOARD_NOTES_DATA_START = "DASHBOARD_NOTES_DATA_START";
export const DASHBOARD_NOTES_DATA_SUCCESS = "DASHBOARD_NOTES_DATA_SUCCESS";
export const DASHBOARD_NOTES_DATA_FAIL = "DASHBOARD_NOTES_DATA_FAIL";

export const DASHBOARD_NOTIFICATION_START = "DASHBOARD_NOTIFICATION_START";
export const DASHBOARD_NOTIFICATION_SUCCESS = "DASHBOARD_NOTIFICATION_SUCCESS";
export const DASHBOARD_NOTIFICATION_FAIL = "DASHBOARD_NOTIFICATION_FAIL";

export const dashboardDataStart = () => {
  return {
    type: DASHBOARD_DATA_START,
  };
};

export const dashboardDataSuccess = (data) => {
  return {
    type: DASHBOARD_DATA_SUCCESS,
    data: data,
  };
};

export const dashboardDataFail = (error) => {
  return {
    type: DASHBOARD_DATA_FAIL,
    error,
  };
};

export const dashboardData = (token, url) => {
  return (dispatch) => {
    dispatch(dashboardDataStart());
    fetch(`http://${localhost}:8080/${url}/dashboard`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(dashboardDataSuccess(resData.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(dashboardDataFail(err));
      });
  };
};

export const dashboardVideoDataStart = () => {
  return {
    type: DASHBOARD_VIDEO_DATA_START,
  };
};

export const dashboardVideoDataSuccess = (data) => {
  return {
    type: DASHBOARD_VIDEO_DATA_SUCCESS,
    data: data,
  };
};

export const dashboardVideoDataFail = (error) => {
  return {
    type: DASHBOARD_VIDEO_DATA_FAIL,
    error,
  };
};

export const dashboardVideoData = (token) => {
  return (dispatch) => {
    dispatch(dashboardVideoDataStart());
    fetch(`http://${localhost}:8080/teacher/dashboard-video`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log('[Actions]',resData.data);
        dispatch(dashboardVideoDataSuccess(resData.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(dashboardVideoDataFail(err));
      });
  };
};

export const dashboardNotesDataStart = () => {
  return {
    type: DASHBOARD_NOTES_DATA_START,
  };
};

export const dashboardNotesDataSuccess = (data) => {
  return {
    type: DASHBOARD_NOTES_DATA_SUCCESS,
    data: data,
  };
};

export const dashboardNotesDataFail = (error) => {
  return {
    type: DASHBOARD_NOTES_DATA_FAIL,
    error,
  };
};

export const dashboardNotesData = (token) => {
  return (dispatch) => {
    dispatch(dashboardNotesDataStart());
    fetch(`http://${localhost}:8080/teacher/dashboard-book`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log('[Actions]',resData.data);
        dispatch(dashboardNotesDataSuccess(resData.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(dashboardNotesDataFail(err));
      });
  };
};

export const dashboardPaperDataStart = () => {
  return {
    type: DASHBOARD_PAPER_DATA_START,
  };
};

export const dashboardPaperDataSuccess = (data) => {
  return {
    type: DASHBOARD_PAPER_DATA_SUCCESS,
    data: data,
  };
};

export const dashboardPaperDataFail = (error) => {
  return {
    type: DASHBOARD_PAPER_DATA_FAIL,
    error,
  };
};

export const dashboardPaperData = (token) => {
  return (dispatch) => {
    dispatch(dashboardPaperDataStart());
    fetch(`http://${localhost}:8080/teacher/dashboard-paper`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log('[Actions]',resData.data);
        dispatch(dashboardPaperDataSuccess(resData.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(dashboardPaperDataFail(err));
      });
  };
};

export const dashboardNotificationStart = () => {
  return {
    type: DASHBOARD_NOTIFICATION_START,
  };
};

export const dashboardNotificationSuccess = (data) => {
  return {
    type: DASHBOARD_NOTIFICATION_SUCCESS,
    data: data,
  };
};

export const dashboardNotificationFail = (error) => {
  return {
    type: DASHBOARD_NOTIFICATION_FAIL,
    error,
  };
};

export const dashboardNotification = (branch, token) => {
  return (dispatch) => {
    dispatch(dashboardNotificationStart());
    // console.log("action.js BRANCH", branch);
    fetch(`http://${localhost}:8080/student/dashboard-notification/` + branch, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        // console.log(resData.notification);
        dispatch(dashboardNotificationSuccess(resData.notification));
      })
      .catch((err) => {
        dispatch(dashboardNotificationFail(err));
      });
  };
};
