import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
    data: [],
    loading: true,
    error: null,
    show: false,
    paginateLoading: true,
    paginateError: null,
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

   case actionTypes.LOAD_NOTES_LEC_SUCCESS: return updateObject(state, {loading: false, data: action.data});
   case actionTypes.LOAD_NOTES_LEC_FAIL: return updateObject(state, {error: action.error, loading: false});

   case actionTypes.PAGINATE_NOTES_LEC_START: return updateObject(state, {paginateLoading: true, paginateError: false});
   case actionTypes.PAGINATE_NOTES_LEC_SUCCESS: return updateObject(state, {data: state.data.concat(action.data), paginateLoading: false, paginateError: null});
   case actionTypes.PAGINATE_NOTES_LEC_FAIL: return updateObject(state, {error: action.error, paginateLoading: false});

   case actionTypes.SUBMIT_NOTES_LEC_START: return updateObject(state, {loading: true});
   case actionTypes.SUBMIT_NOTES_LEC_SUCCESS: return updateObject(state, {loading: false, data: insertAtBeginning(state.data, action)});
   default: return state;
 }
};

export default reducer;
