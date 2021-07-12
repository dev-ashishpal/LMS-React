import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  // Branches
  branches: [],
  branchesLoading: false,
  branchesError: null,
  // Giphy
  giphyData: {},
  giphyLoading: false,
  giphyError: null,
  // Message
  messages: [],
  msgLoading: false,
  msgError: null,

  //Submit Message
  submitError: null,
  newMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BRANCHES_START: return updateObject(state, { branchesLoading: true, branchesError: null });
    case actionTypes.LOAD_BRANCHES_SUCCESS: return updateObject(state, { branchesLoading: false, branches: action.data, branchesError: null });
    case actionTypes.LOAD_BRANCHES_FAIL: return updateObject(state, { branchesLoading: false, branchesError: action.error });

    case actionTypes.GET_GIPHY_START: return updateObject(state, { giphyLoading: true, giphyError: null });
    case actionTypes.GET_GIPHY_SUCCESS: return updateObject(state, { giphyLoading: false, giphyData: action.data, giphyError: null });
    case actionTypes.GET_GIPHY_FAIL: return updateObject(state, { giphyLoading: false, giphyError: action.error });

    case actionTypes.GET_MESSAGE_START: return updateObject(state, { msgLoading: true, msgError: null });
    case actionTypes.GET_MESSAGE_SUCCESS: return updateObject(state, { msgLoading: false, messages: action.data, msgError: null });
    case actionTypes.GET_MESSAGE_FAIL: return updateObject(state, { msgLoading: false,  msgError: action.error });

    case actionTypes.POST_MESSAGE_START: return updateObject(state, { submitError: null });
    case actionTypes.POST_MESSAGE_SUCCESS: return updateObject(state, { submitError: null });
    case actionTypes.POST_MESSAGE_FAIL: return updateObject(state, { submitError: action.error });

    case actionTypes.ADD_MESSAGE: return updateObject(state, {newMessage: action.message, messages: state.messages.concat(action.message)});

    default: return state;
  }
};

export default reducer;
