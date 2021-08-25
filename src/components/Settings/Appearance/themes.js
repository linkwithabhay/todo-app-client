import { createTheme } from "@material-ui/core";
import { blue, deepPurple, lightBlue } from "@material-ui/core/colors";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: lightBlue["A400"],
    },
    secondary: {
      main: deepPurple[500],
    },
    action: {
      checked: blue[500],
    },
  },
  overrides: {
    MuiRadio: {
      colorSecondary: {
        "&.Mui-checked": {
          color: blue[500],
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: lightBlue["A400"],
    },
    action: {
      checked: blue[500],
    },
  },
  overrides: {
    MuiRadio: {
      colorSecondary: {
        "&.Mui-checked": {
          color: blue[500],
        },
      },
    },
  },
});
