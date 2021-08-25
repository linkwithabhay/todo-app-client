import { THEME } from "../constants/actionTypes";
import { darkTheme, lightTheme } from "../components/Settings/Appearance/themes";

const theme = (state = { isCustom: false, variant: undefined, theme: undefined }, action) => {
  const isCustom = action?.data?.isCustom;
  const variant = action?.data?.variant;

  switch (action.type) {
    case THEME:
      const theme = isCustom ? (variant === "dark" ? darkTheme : lightTheme) : variant === "dark" ? darkTheme : lightTheme;
      return { theme };

    default:
      return state;
  }
};

export default theme;
