import { combineReducers } from "redux";

// Reducer Components
import auth from "./auth";
import error from "./error";
import isLoading from "./isLoading";
import theme from "./theme";

export const reducers = combineReducers({
  auth,
  error,
  isLoading,
  theme,
});
