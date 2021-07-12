import * as actionTypes from "./actions";
import {updateObject} from "./utility";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLASSMATE_START: return updateObject(state, {loading: true, error: null});
    case actionTypes.GET_CLASSMATE_SUCCESS: return updateObject(state, {data: action.data, loading: false, error: null});
    case actionTypes.GET_CLASSMATE_FAIL: return updateObject(state, {loading: false, error: action.error});
    default: return state;
  }
};

export default reducer;