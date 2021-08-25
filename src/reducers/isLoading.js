import { START_LOADING, STOP_LOADING } from "../constants/actionTypes";

const isLoading = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };

    case STOP_LOADING:
      return { isLoading: false };

    default:
      return state;
  }
};

export default isLoading;
