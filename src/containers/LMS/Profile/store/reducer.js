import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  data: null,
  loading: false,
  error: null,
  sent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PROFILE_START: return updateObject(state, {loading: true, error: null});
    case actionTypes.LOAD_PROFILE_SUCCESS: return updateObject(state, { data: action.data, loading: false, error: null });
    case actionTypes.LOAD_PROFILE_FAIL: return updateObject(state, { error: action.error, loading: false });

    case actionTypes.SENT_PROFILE: return updateObject(state, { sent: action.sent});
    default: return state;
  }
};

export default reducer;
