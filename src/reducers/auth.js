import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      const profile = {
        result: {
          email: action?.data?.result?.email,
          name: action?.data?.result?.name,
          _id: action?.data?.result?._id,
        },
        token: action?.data?.token,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      return { ...state, authData: action?.data, loading: false, errors: null };

    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;
