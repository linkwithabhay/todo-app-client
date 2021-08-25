import * as api from "../api";
import { AUTH, ERROR, REVALIDATE, START_LOADING, STOP_LOADING, UPDATE_USER } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: STOP_LOADING });
    history.push("/dashboard");
  } catch (error) {
    if (Boolean(error?.response?.data)) {
      dispatch({ type: ERROR, data: error?.response?.data });
    }
    if (error?.request?.status === 0) {
      if (navigator.onLine) {
        dispatch({ type: ERROR, data: { message: "Server Error! Try again after some time.", type: "serverOFFLINE", severity: "error" } });
      } else {
        dispatch({ type: ERROR, data: { message: "Internet Disconnected!", type: "userOFFLINE", severity: "error" } });
      }
    }
    dispatch({ type: STOP_LOADING });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: STOP_LOADING });
    history.push("/dashboard");
  } catch (error) {
    if (Boolean(error?.response?.data)) {
      dispatch({ type: ERROR, data: error?.response?.data });
    }
    if (error?.request?.status === 0) {
      if (navigator.onLine) {
        dispatch({ type: ERROR, data: { message: "Server Error! Try again after some time.", type: "serverOFFLINE", severity: "error" } });
      } else {
        dispatch({ type: ERROR, data: { message: "Internet Disconnected!", type: "userOFFLINE", severity: "error" } });
      }
    }
    dispatch({ type: STOP_LOADING });
  }
};

export const revalidate = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.reValidate(formData);
    dispatch({ type: REVALIDATE, data });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    if (Boolean(error?.response?.data)) {
      dispatch({ type: ERROR, data: error?.response?.data });
    }
    if (error?.request?.status === 0) {
      if (navigator.onLine) {
        dispatch({ type: ERROR, data: { message: "Server Error!! Try again after some time.", type: "serverOFFLINE", severity: "error" } });
      } else {
        dispatch({
          type: ERROR,
          data: { message: "Internet Disconnected !!", type: "userOFFLINE", severity: "error" },
        });
      }
    }
    dispatch({ type: STOP_LOADING });
  }
};

export const updateuser =
  (formData, history, to, wait = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.updateUser(formData);
      dispatch({ type: UPDATE_USER, data });
      if (wait) {
        setTimeout(() => {
          dispatch({ type: REVALIDATE, data: undefined });
          dispatch({ type: STOP_LOADING });
          if (to) {
            history.push(to);
          }
        }, wait);
      } else {
        dispatch({ type: REVALIDATE, data: undefined });
        dispatch({ type: STOP_LOADING });
        if (to) {
          history.push(to);
        }
      }
    } catch (error) {
      if (Boolean(error?.response?.data)) {
        dispatch({ type: ERROR, data: error?.response?.data });
      }
      if (error?.request?.status === 0) {
        if (navigator.onLine) {
          dispatch({
            type: ERROR,
            data: { message: "Server Error! Try again after some time.", type: "serverOFFLINE", severity: "error" },
          });
        } else {
          dispatch({ type: ERROR, data: { message: "Internet Disconnected!", type: "userOFFLINE", severity: "error" } });
        }
      }
      dispatch({ type: STOP_LOADING });
    }
  };
