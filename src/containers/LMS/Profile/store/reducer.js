import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  data: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PROFILE_START: return updateObject(state);
    case actionTypes.LOAD_PROFILE_SUCCESS: return updateObject(state, { data: action.data });
    case actionTypes.LOAD_PROFILE_FAIL: return updateObject(state, { error: action.error });
    default: return state;
  }
};

export default reducer;
