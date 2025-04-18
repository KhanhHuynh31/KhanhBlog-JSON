import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCESS,
  RESET_USER_ALERT,
} from "../actions/UserActions";

let userStorage = {};
if (localStorage.getItem(LOGIN_SUCCESS)) {
  userStorage = JSON.parse(localStorage.getItem(LOGIN_SUCCESS));
}
const initialState = {
  loading: false,
  success: null,
  user: userStorage,
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS: {
      localStorage.removeItem(LOGIN_SUCCESS);
      return { ...state, success: "Logout successful!", user: null };
    }
    case LOGIN_SUCCESS: {
      let userLogin = action.payload;
      localStorage.setItem(LOGIN_SUCCESS, JSON.stringify(userLogin));
      return { ...state, success: "Login successful!", user: userLogin };
    }
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return { ...state, success: "Register successful!", user: action.payload };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_USER_ALERT:
      return {
        ...state,
        success: null,
        error: null
      }
    default:
      return { ...state };
  }
};
