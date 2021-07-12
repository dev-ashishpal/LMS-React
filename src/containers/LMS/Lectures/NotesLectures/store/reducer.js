import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  show: false,
  data: [],
  loading: true,
  error: null,

  submitError: null,
  // paginateLoading: true,
  // paginateError: null,
};

const insertAtBeginning = (array, action) => {
  const newArray = [...array];
  newArray.unshift(action.data);
  return newArray;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL: return updateObject(state, { show: true });
    case actionTypes.CLOSE_MODAL: return updateObject(state, { show: false });

    case actionTypes.LOAD_NOTES_LEC_START: return updateObject(state, { loading: true, error: null });
    case actionTypes.LOAD_NOTES_LEC_SUCCESS: return updateObject(state, { loading: false, data: action.data, error: null, });
    case actionTypes.LOAD_NOTES_LEC_FAIL: return updateObject(state, { error: action.error, loading: false });

    case actionTypes.SUBMIT_NOTES_LEC_START: return updateObject(state, { submitError: null, });
    case actionTypes.SUBMIT_NOTES_LEC_SUCCESS: return updateObject(state, { submitError: null, data: insertAtBeginning(state.data, action), });
    case actionTypes.SUBMIT_NOTES_LEC_FAIL: return updateObject(state, {submitError: action.error});

    //  case actionTypes.PAGINATE_NOTES_LEC_START: return updateObject(state, {paginateLoading: true, paginateError: false});
    //  case actionTypes.PAGINATE_NOTES_LEC_SUCCESS: return updateObject(state, {data: state.data.concat(action.data), paginateLoading: false, paginateError: null});
    //  case actionTypes.PAGINATE_NOTES_LEC_FAIL: return updateObject(state, {error: action.error, paginateLoading: false});

    default: return state;
  }
};

export default reducer;
