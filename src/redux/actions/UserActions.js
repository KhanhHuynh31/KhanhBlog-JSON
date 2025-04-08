import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
const BIN_ID = "67f087638561e97a50f8ed01";
const X_MASTER_KEY =
  "$2a$10$pSHuOZVPA7JH20w31fABbeHjnUc/tZPJNVadteRITlYzOjwVP6Fli";

export const loginUser = (name, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.jsonbin.io/v3/b/${BIN_ID}`,
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
        alert("Login failed. Please check your email and password.");
        dispatch({ type: LOGIN_FAILURE, payload: response.message });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};
export const registerUser = (newUser) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
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
      `https://api.jsonbin.io/v3/b/${BIN_ID}`,
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
