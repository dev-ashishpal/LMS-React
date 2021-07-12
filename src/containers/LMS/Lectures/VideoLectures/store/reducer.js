import * as actionCreators from './actions';
import {updateObject} from './utility';
const initialState = {
  data: [],
  loading: true,
  error: null,
  addVidError: null,
  editing: false,
  editPost: null,
  show: false,
  isVideo: true,
  watchlist: [],
};

const insertAtBeginning = (array,action) => {
  let newArray = [...array];
  newArray.unshift(action.data);
  return newArray;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionCreators.SHOW_MODAL: return updateObject(state, {show: true});
    case actionCreators.CLOSE_MODAL: return updateObject(state, {show: false, editing: false, editPost: null});

    case actionCreators.LOAD_VID_LEC_START: return updateObject(state, {loading: true, error: null});
    case actionCreators.LOAD_VID_LEC_SUCCESS: return updateObject(state, {data: action.data, loading: false, error: null});
    case actionCreators.LOAD_VID_LEC_FAIL: return updateObject(state, {error: action.error, loading: false});

    case actionCreators.EDIT_VID_LEC_SUCCESS: return updateObject(state, {editPost: action.editPost, editing: true});

    case actionCreators.SUBMIT_VID_LEC_START: return updateObject(state, {loading: true, addVidError: null});
    case actionCreators.SUBMIT_VID_LEC_SUCCESS: return updateObject(state, {loading: false, addVidError: null, data: insertAtBeginning(state.data,action)});
    case actionCreators.SUBMIT_VID_LEC_FAIL: return updateObject(state, {loading: false, addVidError: action.error});

    default: return state;
  }
};

export default reducer;
