import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  data: [],
  loading: true,
  error: null,
  show: false,
};

const insertAtBeginning = (array, action) => {
  const newArray = [...array];
  newArray.unshift(action.data);
  return newArray;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL: return updateObject(state, { show: true });
    case actionTypes.CLOSE_MODAL: return updateObject(state, {show: false});
    case actionTypes.LOAD_PAPER_LEC_SUCCESS: return updateObject(state, {loading: false, data: action.data.reverse()});
    case actionTypes.LOAD_PAPER_LEC_FAIL: return updateObject(state, {error: action.error, loading: false});
    case actionTypes.SUBMIT_PAPER_LEC_START: return updateObject(state, {loading: true});
    case actionTypes.SUBMIT_PAPER_LEC_SUCCESS: return updateObject(state, {loading: false, data: insertAtBeginning(state.data,action)});
    default:
      return state;
  }
};

export default reducer;
