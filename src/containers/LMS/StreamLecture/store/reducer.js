import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  data: null,
  error: null,
  loading: false,

  comment: [],
  cmtLoading: false,
  cmtError: null,

  submitCmtError: null,

  deleteCmtError: null
};

const addComment = (arr, comment) => {
  const newArr = [...arr];
  newArr.unshift(comment);
  return newArr;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIDEO_START: return updateObject(state, { loading: true, });
    case actionTypes.GET_VIDEO_SUCCESS: return updateObject(state, { data: action.data, loading: false, error: null, });
    case actionTypes.GET_VIDEO_FAIL: return updateObject(state, { error: action.error, loading: false });

    case actionTypes.GET_COMMENT_START: return updateObject(state, {cmtLoading: true, cmtError: null});
    case actionTypes.GET_COMMENT_SUCCESS: return updateObject(state, {comment: action.data, cmtLoading: false, cmtError: null});
    case actionTypes.GET_COMMENT_FAIL: return updateObject(state, {cmtLoading: false, cmtError: action.error});

    case actionTypes.POST_COMMENT_START: return updateObject(state, {submitCmtError: null});
    case actionTypes.POST_COMMENT_FAIL: return updateObject(state, {submitCmtError: action.error});

    case actionTypes.DELETE_COMMENT_START: return updateObject(state, {deleteCmtError: null});
    case actionTypes.DELETE_COMMENT_FAIL: return updateObject(state, {deleteCmtError: action.error});

    case actionTypes.ADD_COMMENT: return updateObject(state, {comment: addComment(state.comment, action.comment)});
    default: return state;
  }
};

export default reducer;
