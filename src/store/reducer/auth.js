import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  teacherToken: null,
  teacherId: null,
  studentToken: null,
  studentId: null,
  show: false,
  showLogin: false,
  showSignup: false,
  error: null,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOGIN: return updateObject(state, {show: true, showLogin: true, showSignup: false, error: null});
      // return {
      //   ...state,
      //   show: true,
      //   showLogin: true,
      //   showSignup: false,
      //   error: null,
      // };
    case actionTypes.SHOW_SIGNUP: return updateObject(state, {show: true, showSignup: true, showLogin: false, error: null});
      // return {
      //   ...state,
      //   show: true,
      //   showSignup: true,
      //   showLogin: false,
      //   error: null,
      // };
    case actionTypes.CLOSE_MODAL: return updateObject(state, {show: false, showLogin: false, showSignup: false, error: null});
      // return {
      //   ...state,
      //   show: false,
      //   showLogin: false,
      //   showSignup: false,
      //   error: null,
      // };
    case actionTypes.TEACHER_AUTH_START: return updateObject(state, {error: null});
      // return {
      //   ...state,
      //   error: null,
      // };
    case actionTypes.TEACHER_AUTH_SUCCESS: return updateObject(state, {teacherToken: action.teacherToken, teacherId: action.teacherId, studentToken: action.studentToken, studentId: action.studentId, error: null});
      // return {
      //   ...state,
      //   teacherToken: action.teacherToken,
      //   teacherId: action.teacherId,
      //   studentToken: action.studentToken,
      //   studentId: action.studentId,
      //   error: null,
      // };
    case actionTypes.TEACHER_AUTH_FAIL: return updateObject(state, {error: action.error});
      // return {
      //   ...state,
      //   error: action.error,
      // };
    case actionTypes.TEACHER_LOGOUT: return updateObject(state, {teacherToken: null, teacherId: null});
      // return {
      //   ...state,
      //   teacherToken: null,
      //   teacherId: null,
      // };
    case actionTypes.STUDENT_LOGOUT: return updateObject(state, {studentToken: null, studentId: null});
      // return {
      //   ...state,
      //   studentToken: null,
      //   studentId: null,
      // };

    // case actionTypes.SET_AUTH_REDIRECT_PATH:
    //   return {
    //     ...state,
    //     authRedirectPath: action.path,
    //   }
    default:
      return state;
  }
};

export default reducer;
