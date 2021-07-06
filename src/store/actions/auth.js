import * as actionTypes from "./actionTypes";
import { userAgent } from "../../util/userAgent";
import { caughtError } from "../../util/caughtError";

let localhost = "localhost";
if (userAgent()) {
  localhost = "192.168.43.135";
}

export const showLogin = () => {
  return {
    type: actionTypes.SHOW_LOGIN,
  };
};

export const showSignup = () => {
  return {
    type: actionTypes.SHOW_SIGNUP,
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL,
  };
};

export const userAuthStart = () => {
  return {
    type: actionTypes.USER_AUTH_START,
  };
};

export const userAuthSuccess = (
  teacherToken,
  teacherId,
  studentToken,
  studentId
) => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    teacherId,
    teacherToken,
    studentId,
    studentToken,
  };
};

export const userAuthFail = (error) => {
  return {
    type: actionTypes.USER_AUTH_FAIL,
    error: error,
  };
};

export const teacherSignup = (data, array) => {
  return async (dispatch) => {
    let ok;
    try {
      const res = await fetch(`http://${localhost}:8080/teacher/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();

      if (ok === false) {
        throw new Error(resData.message);
      }
      dispatch(showLogin());
      array.length = 0;
    } catch (err) {
      caughtError(dispatch, userAuthFail, err);
    }
  };
};

export const studentSignup = (data) => {
  return async (dispatch) => {
    let ok;
    dispatch(userAuthStart());
    try {
      const res = await fetch(`http://${localhost}:8080/student/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();

      if (ok === false) {
        throw new Error(resData.message);
      }
      dispatch(showLogin());
      // console.log(resData);
    } catch (err) {
      caughtError(dispatch, userAuthFail, err);
    }
  };
};

export const teacherLogout = () => {
  localStorage.removeItem("teacherToken");
  localStorage.removeItem("teacherId");
  localStorage.removeItem("teacherExpirationDate");
  localStorage.removeItem("URL");
  return {
    type: actionTypes.TEACHER_LOGOUT,
  };
};

export const studentLogout = () => {
  // localStorage.removeItem("studentToken");
  localStorage.removeItem("studentId");
  localStorage.removeItem("studentExpirationDate");
  return {
    type: actionTypes.STUDENT_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(teacherLogout());
      dispatch(studentLogout());
    }, expirationTime * 1000);
  };
};

export const teacherLogin = (data) => {
  return async (dispatch) => {
    let ok;
    dispatch(userAuthStart());
    try {
      const res = await fetch(`http://${localhost}:8080/teacher/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();

      if (ok === false) {
        throw new Error(resData.message);
      }
      const expiresIn = 60 * 60;
      localStorage.setItem("teacherToken", resData.data.token);
      localStorage.setItem("teacherId", resData.data.userId);
      localStorage.setItem(
        "teacherExpirationDate",
        new Date(new Date().getTime() + expiresIn * 1000)
      );
      dispatch(
        userAuthSuccess(resData.data.token, resData.data.userId, null, null)
      );
      dispatch(checkAuthTimeout(expiresIn));
    } catch (err) {
      caughtError(dispatch, userAuthFail, err);
    }
  };
};

export const studentLogin = (data) => {
  return async (dispatch) => {
    let ok;
    dispatch(userAuthStart());
    try {
      const res = await fetch(`http://${localhost}:8080/student/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status !== 201) {
        ok = res.ok;
      }
      const resData = await res.json();

      if (ok === false) {
        console.log(resData.message);
        throw new Error(resData.message);
      }
      const expiresIn = 60 * 60; //time in seconds
      localStorage.setItem("studentToken", resData.data.token);
      localStorage.setItem("studentId", resData.data.userId);
      localStorage.setItem(
        "studentExpirationDate",
        new Date(new Date().getTime() + expiresIn * 1000)
      );
      dispatch(
        userAuthSuccess(null, null, resData.data.token, resData.data.userId)
      );
      dispatch(checkAuthTimeout(expiresIn));
    } catch (err) {
      caughtError(dispatch, userAuthFail, err);
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const teacherToken = localStorage.getItem("teacherToken");
    if (!teacherToken) {
      dispatch(teacherLogout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("teacherExpirationDate")
      );
      if (expirationDate <= new Date()) {
        dispatch(teacherLogout());
      } else {
        const userId = localStorage.getItem("teacherId");
        dispatch(userAuthSuccess(teacherToken, userId, null, null));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
    const studentToken = localStorage.getItem("studentToken");
    if (!studentToken) {
      dispatch(studentLogout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("studentExpirationDate")
      );
      if (expirationDate <= new Date()) {
        dispatch(studentLogout());
      } else {
        const userId = localStorage.getItem("studentId");
        dispatch(userAuthSuccess(null, null, studentToken, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

// export const setAuthRedirectPath = (path) => {
//   return {
//     type: actionTypes.SET_AUTH_REDIRECT_PATH,
//     path,
//   };
// };
