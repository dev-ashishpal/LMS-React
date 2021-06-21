import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  data: null,
  error: null,
  loading: false,
  commentBox: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_VIDEO_START: return updateObject(state, { loading: true, });
    case actionTypes.LOAD_VIDEO_SUCCESS: return updateObject(state, { data: action.data, loading: false, error: null, });
    case actionTypes.LOAD_VIDEO_FAIL: return updateObject(state, { error: action.error, loading: false });
    case actionTypes.EMPTY_COMMENT_BOX: return updateObject(state, { commentBox: "" });
    default: return state;
  }
};

export default reducer;
