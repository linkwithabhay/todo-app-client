import React from "react";
import { useDispatch } from "react-redux";

// Material UI
// prettier-ignore
import { FormControl, Grid, RadioGroup } from "@material-ui/core";

// Components
import CustomRadio from "./CustomRadio";
import { darkTheme, lightTheme } from "./themes";
import { START_LOADING, STOP_LOADING } from "../../../constants/actionTypes";

const CustomTheme = (props) => {
  const { theme, setTheme } = props;
  const dispatch = useDispatch();

  const handleSelectThemeVariant = (event) => {
    dispatch({ type: START_LOADING });
    theme.custom.variant = event.target.value;
    setTheme({ ...theme });
    setTimeout(() => {
      dispatch({ type: STOP_LOADING });
    }, 500);
  };

  return (
    <>
      <Grid item>
        <FormControl fullWidth component="fieldset">
          <RadioGroup
            aria-label="select custom theme"
            name="themeVariant"
            value={theme?.custom?.variant}
            onChange={handleSelectThemeVariant}
          >
            <Grid item container style={{ gap: "1rem" }}>
              <CustomRadio variant={theme?.custom?.variant} theme={lightTheme} label="Default Light" value="light" />
              <CustomRadio variant={theme?.custom?.variant} theme={darkTheme} label="Default Dark" value="dark" />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};

export default CustomTheme;
