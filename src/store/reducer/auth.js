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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOGIN: return updateObject(state, {show: true, showLogin: true, showSignup: false, error: null});
    case actionTypes.SHOW_SIGNUP: return updateObject(state, {show: true, showSignup: true, showLogin: false, error: null});
    case actionTypes.CLOSE_MODAL: return updateObject(state, {show: false, showLogin: false, showSignup: false, error: null});

    case actionTypes.USER_AUTH_START: return updateObject(state, {error: null});
    case actionTypes.USER_AUTH_SUCCESS: return updateObject(state, {teacherToken: action.teacherToken, teacherId: action.teacherId, studentToken: action.studentToken, studentId: action.studentId, error: null});
    case actionTypes.USER_AUTH_FAIL: return updateObject(state, {error: action.error});

    case actionTypes.TEACHER_LOGOUT: return updateObject(state, {teacherToken: null, teacherId: null});
    case actionTypes.STUDENT_LOGOUT: return updateObject(state, {studentToken: null, studentId: null});
    default:
      return state;
  }
};

export default reducer;
