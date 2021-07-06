import * as actionTypes from "./actions";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLASSMATE_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_CLASSMATE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null,
      };
    case actionTypes.GET_CLASSMATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;