import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: true,
  authLoading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        authLoading: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        authLoading: false,
        error: null,
        ...payload,
      };
    case actionTypes.USER_LOADED:
      return {
        ...state,
        loading: false,
        authLoading: false,
        error: null,
        ...payload,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        authLoading: false,
        error: payload,
      };

    case actionTypes.AUTH_LOGOUT: {
      return {
        token: null,
        user: null,
        error: {},
        loading: false,
        authLoading: false,
      };
    }

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
