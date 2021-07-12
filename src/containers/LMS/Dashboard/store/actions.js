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

export const DASHBOARD_STUDENTS_START = "DASHBOARD_STUDENTS_START";
export const DASHBOARD_STUDENTS_SUCCESS = "DASHBOARD_STUDENTS_SUCCESS";
export const DASHBOARD_STUDENTS_FAIL = "DASHBOARD_STUDENTS_FAIL";

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

export const dashboardVideoData = (token, url) => {
  return async (dispatch) => {
    dispatch(dashboardVideoDataStart());
    fetch(`http://${localhost}:8080/${url}/dashboard-video`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        dispatch(dashboardVideoDataSuccess(resData.data));
      })
      .catch((err) => {
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

export const dashboardNotesData = (token, url) => {
  return async (dispatch) => {
    try {
      dispatch(dashboardNotesDataStart());
      const res = await fetch(
        `http://${localhost}:8080/${url}/dashboard-book`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "GET",
        }
      );
      const resData = await res.json();
      dispatch(dashboardNotesDataSuccess(resData.data));
    } catch (err) {
      dispatch(dashboardNotesDataFail(err));
    }
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

export const dashboardPaperData = (token, url) => {
  return async (dispatch) => {
    dispatch(dashboardPaperDataStart());
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/dashboard-paper`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "GET",
        }
      );
      const resData = await res.json();
      dispatch(dashboardPaperDataSuccess(resData.data));
    } catch (err) {
      dispatch(dashboardPaperDataFail(err));
    }
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
        dispatch(dashboardNotificationSuccess(resData.notification));
      })
      .catch((err) => {
        dispatch(dashboardNotificationFail(err));
      });
  };
};

export const dashboardStudentsStart = () => {
  return {
    type: DASHBOARD_STUDENTS_START,
  };
};

export const dashboardStudentsSuccess = (data) => {
  return {
    type: DASHBOARD_STUDENTS_SUCCESS,
    data,
  };
};

export const dashboardStudentsFail = (error) => {
  return {
    type: DASHBOARD_STUDENTS_FAIL,
    error,
  };
};

export const dashboardStudents = (token, url) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://${localhost}:8080/${url}/dashboard-students`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await res.json();
      dispatch(dashboardStudentsSuccess(resData.data));
    } catch (err) {
      dispatch(dashboardStudentsFail(err));
    }
  };
};
