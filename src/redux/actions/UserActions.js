import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const RESET_USER_ALERT = "RESET_USER_ALERT";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const VITE_USER_BIN_ID = import.meta.env.VITE_USER_BIN_ID;
const X_MASTER_KEY = import.meta.env.VITE_X_MASTER_KEY;

export const loginUser = (name, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.jsonbin.io/v3/b/${VITE_USER_BIN_ID}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": X_MASTER_KEY,
          },
        }
      );
      const users = response.data.record.user;
      const user = users.find(
        (user) => user.user_name === name && user.user_password === password
      );
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      } else {
        const errorMessage = "Login failed. Please check your email and password";
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};
export const registerUser = (newUser) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${VITE_USER_BIN_ID}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": X_MASTER_KEY,
      },
    });

    const existingData = response.data.record;
    if (!existingData.user) {
      existingData.user = [];
    }
    const existingUserIds = existingData.user.map((user) =>
      parseInt(user.user_id, 10)
    );
    const nextUserId =
      existingUserIds.length > 0 ? Math.max(...existingUserIds) + 1 : 1;
    const userWithId = {
      ...newUser,
      user_id: nextUserId.toString(),
    };
    existingData.user.push(userWithId);
    const updateResponse = await axios.put(
      `https://api.jsonbin.io/v3/b/${VITE_USER_BIN_ID}`,
      existingData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": X_MASTER_KEY,
        },
      }
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: updateResponse.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
export const ResetUserAlert = () => {
    return {
        type: RESET_USER_ALERT,
    }
}