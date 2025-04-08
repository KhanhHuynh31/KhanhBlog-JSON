import { THEME_REQUEST } from "../actions/WebAction";

let themeStorage = "light";
if (localStorage.getItem(THEME_REQUEST)) {
  themeStorage = JSON.parse(localStorage.getItem(THEME_REQUEST));
}
const initialState = {
  theme: themeStorage,
  loading: false,
  success: false,
  error: null,
};

export const WebReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_REQUEST:
      if (state.theme === "light") {
        localStorage.setItem(THEME_REQUEST, JSON.stringify("dark"));

        return { ...state, loading: false, success: true, theme: "dark" };
      } else {
        localStorage.setItem(THEME_REQUEST, JSON.stringify("light"));

        return { ...state, loading: false, success: true, theme: "light" };
      }
    default:
      return state;
  }
};
