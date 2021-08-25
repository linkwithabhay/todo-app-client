import { ERROR } from "../constants/actionTypes";

const error = (state = { errorData: null }, action) => {
  switch (action.type) {
    case ERROR:
      return { errorData: action?.data };

    default:
      return state;
  }
};

export default error;
