import * as actionTypes from "./actionTypes";
import axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken } from "../../utils/auth";
import { Alert } from "react-native";

export const clearErrors = () => {
  return { type: actionTypes.CLEAR_ERRORS };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const submitForm = { email, password };
      const {
        data: { user, token },
      } = await axios.post("/users/login", submitForm);
      setAuthToken(token);
      await AsyncStorage.setItem("userToken", token);
      dispatch(authSuccess(token));
      dispatch(loadUser());
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const signup = (
  name,
  email,
  phone,
  { password = undefined, update = false }
) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const submitForm = {
        name,
        email,
        phone,
      };

      if (!update) {
        submitForm.password = password;
        const {
          data: { user, token },
        } = await axios.post("/users", submitForm);
        setAuthToken(token);
        await AsyncStorage.setItem("userToken", token);
        dispatch(authSuccess(token));
      } else {
        await axios.patch("/users/me", submitForm);
        Alert.alert("Profie updated succesfully!");
      }
      dispatch(loadUser());
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setAuthToken(token);
      const { data } = await axios.get("/users/me");
      dispatch(userLoaded(token, data));
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

const userLoaded = (token, user) => {
  return {
    type: actionTypes.USER_LOADED,
    payload: { token, user },
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token },
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userToken");
      dispatch(logout());
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const uploadImage = (photo) => {
  return async (dispatch) => {
    let fileName = photo.fileName;
    if (fileName) {
      const temp = fileName.split(".");
      temp[temp.length - 1] = "jpeg";
      fileName = temp.join(".");
    }
    try {
      const fd = new FormData();
      fd.append("avatar", {
        name: photo.fileName ? fileName : "profile.jpeg",
        type: "image/jpeg",
        uri: photo.uri,
      });
      await axios.post("/users/me/avatar", fd);
      dispatch(loadUser());
    } catch (err) {
      Alert.alert(err.response ? err.response.data.errMessage : err.message);
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};

export const deleteImage = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/users/me/avatar");
      dispatch(loadUser());
    } catch (err) {
      dispatch(authFail(err.response ? err.response.data : err.message));
    }
  };
};
