import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  branches: [],
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BRANCHES_START: return updateObject(state, { loading: true });
    case actionTypes.LOAD_BRANCHES_SUCCESS: return updateObject(state, { loading: false, branches: action.data });
    case actionTypes.LOAD_BRANCHES_FAIL: return updateObject(state, { loading: false, error: action.error });
    default: return state;
  }
};

export default reducer;
