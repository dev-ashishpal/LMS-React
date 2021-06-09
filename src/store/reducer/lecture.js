import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  branches: [],
  data: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BRANCHES_SUCCESS: return updateObject(state, { branches: action.branches });
    case actionTypes.STUDENT_VIDEOS_START: return updateObject(state, { loading: false });
    case actionTypes.STUDENT_VIDEOS_SUCCESS: return updateObject(state, { data: action.data, error: null });
    case actionTypes.STUDENT_VIDEOS_FAIL: return updateObject(state, { error: action.error });
    default: return state;
  }
};

export default reducer;
