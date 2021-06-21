import * as actionTypes from "./actionTypes";
import { userAgent } from "../../util/userAgent";

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

export const teacherAuthStart = () => {
  return {
    type: actionTypes.TEACHER_AUTH_START,
  };
};

export const teacherAuthSuccess = (
  teacherToken,
  teacherId,
  studentToken,
  studentId
) => {
  return {
    type: actionTypes.TEACHER_AUTH_SUCCESS,
    teacherId,
    teacherToken,
    studentId,
    studentToken,
  };
};

export const teacherAuthFail = (error) => {
  return {
    type: actionTypes.TEACHER_AUTH_FAIL,
    error: error,
  };
};

export const teacherSignup = (data, array) => {
  return (dispatch) => {
    let ok;
    fetch(`http://${localhost}:8080/teacher/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 201) {
          ok = res.ok;
        }
        return res.json();
      })
      .then((data) => {
        if (ok === false) {
          throw new Error(data.message);
        }
        dispatch(showLogin());
        array.length = 0;
        // console.log(data);
      })
      .catch((err) => {
        dispatch(teacherAuthFail(err.message));
      });
  };
};

export const studentSignup = (data) => {
  return (dispatch) => {
    let ok;
    dispatch(teacherAuthStart());
    fetch(`http://${localhost}:8080/student/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 201) {
          ok = res.ok;
        }
        return res.json();
      })
      .then((result) => {
        if (ok === false) {
          throw new Error(result.message);
        }
        dispatch(showLogin());
        // console.log(result);
      })
      .catch((err) => {
        dispatch(teacherAuthFail(err.message));
      });
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
  return (dispatch) => {
    let ok;
    dispatch(teacherAuthStart());
    fetch(`http://${localhost}:8080/teacher/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 201) {
          ok = res.ok;
          console.log(ok);
        }
        return res.json();
      })
      .then((result) => {
        if (ok === false) {
          console.log(result.message);
          throw new Error(result.message);
        }
        console.log(result);
        // console.log(result, result.data.token, result.data.userId);
        const expiresIn = 60 * 60;
        localStorage.setItem("teacherToken", result.data.token);
        localStorage.setItem("teacherId", result.data.userId);
        localStorage.setItem(
          "teacherExpirationDate",
          new Date(new Date().getTime() + expiresIn * 1000)
        );
        dispatch(
          teacherAuthSuccess(result.data.token, result.data.userId, null, null)
        );
        // dispatch(setAuthRedirectPath('/teacher/dashboard'));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(teacherAuthFail(err.message));
      });
  };
};

export const studentLogin = (data) => {
  return (dispatch) => {
    let ok;
    dispatch(teacherAuthStart());
    fetch(`http://${localhost}:8080/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 201) {
          ok = res.ok;
        }
        return res.json();
      })
      .then((result) => {
        if (ok === false) {
          console.log(result.message);
          throw new Error(result.message);
        }
        // console.log(result, result.data.token, result.data.userId);
        const expiresIn = 60 * 60; //time in seconds
        localStorage.setItem("studentToken", result.data.token);
        localStorage.setItem("studentId", result.data.userId);
        localStorage.setItem(
          "studentExpirationDate",
          new Date(new Date().getTime() + expiresIn * 1000)
        );
        dispatch(
          teacherAuthSuccess(null, null, result.data.token, result.data.userId)
        );
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(teacherAuthFail(err.message));
      });
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
        dispatch(teacherAuthSuccess(teacherToken, userId, null, null));
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
        dispatch(teacherAuthSuccess(null, null, studentToken, userId));
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
