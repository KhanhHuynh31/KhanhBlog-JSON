import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
} from "../actions/UserActions";

let userStorage = {};
if (localStorage.getItem(LOGIN_SUCCESS)) {
  userStorage = JSON.parse(localStorage.getItem(LOGIN_SUCCESS));
}
const initialState = {
  loading: false,
  success: false,
  user: userStorage,
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS: {
      localStorage.removeItem(LOGIN_SUCCESS);
      return { ...state, loading: false, success: false, user: null };
    }
    case LOGIN_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case LOGIN_SUCCESS: {
      let userLogin = action.payload;
      localStorage.setItem(LOGIN_SUCCESS, JSON.stringify(userLogin));
      return { ...state, loading: false, success: true, user: userLogin };
    }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case REGISTER_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
