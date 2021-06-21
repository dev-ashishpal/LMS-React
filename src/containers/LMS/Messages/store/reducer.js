import * as actionTypes from "./actions";
import { updateObject } from "./utility";

const initialState = {
  branches: [],
  loading: false,
  error: false,
  giphyLoading: false,
  giphyData: {},
  giphyError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BRANCHES_START: return updateObject(state, { loading: true });
    case actionTypes.LOAD_BRANCHES_SUCCESS: return updateObject(state, { loading: false, branches: action.data });
    case actionTypes.LOAD_BRANCHES_FAIL: return updateObject(state, { loading: false, error: action.error });

    case actionTypes.GET_GIPHY_START: return updateObject(state, { giphyLoading: true });
    case actionTypes.GET_GIPHY_SUCCESS: return updateObject(state, { giphyLoading: false, giphyData: action.data });
    case actionTypes.GET_GIPHY_FAIL: return updateObject(state, { giphyLoading: false, giphyError: action.error });
    default: return state;
  }
};

export default reducer;
