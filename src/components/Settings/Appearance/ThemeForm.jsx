import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Material UI
import useStyles from "../styles";
// prettier-ignore
import { FormControl, FormHelperText,  Grid, InputLabel, MenuItem, Select } from "@material-ui/core";

import { START_LOADING, STOP_LOADING, THEME } from "../../../constants/actionTypes";
import SystemTheme from "./SystemTheme";
import CustomTheme from "./CustomTheme";
import useLocalStorage from "../../../hooks/useLocalStorage";

const ThemeForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [theme, setTheme] = useLocalStorage("theme", {
    isCustom: false,
    custom: {
      variant: "dark",
    },
    system: {
      sysVariant: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    },
  });

  useEffect(() => {
    console.log("Added listener");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSystemThemeChange);
    const data = {
      isCustom: theme?.isCustom,
      variant: theme?.isCustom ? theme?.custom?.variant : theme?.system?.sysVariant,
    };
    dispatch({ type: START_LOADING });
    dispatch({
      type: THEME,
      data,
    });
    // setStoredTheme(JSON.parse(localStorage.getItem("ToDo-App-theme")));
    // setSystemThemeVariant(JSON.parse(localStorage.getItem("ToDo-App-theme"))?.system?.sysVariant);
    setTimeout(() => {
      dispatch({ type: STOP_LOADING });
    }, 500);
    return () => {
      console.log("Removed listener");
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onSystemThemeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const onSystemThemeChange = (event) => {
    if (event.matches) {
      theme.system.sysVariant = "dark";
    } else {
      theme.system.sysVariant = "light";
    }
    setTheme({ ...theme });
    if (!theme.isCustom) {
      dispatch({ type: START_LOADING });
      if (event.matches) {
        dispatch({ type: THEME, data: { isCustom: false, variant: "dark" } });
      } else {
        dispatch({ type: THEME, data: { isCustom: false, variant: "light" } });
      }
      dispatch({ type: STOP_LOADING });
    }
  };

  const handleThemeChange = () => {
    // setSelectedTheme((prev) => {
    //   if (prev === "system") return "custom";
    //   return "system";
    // });
    setTheme((prevTheme) => {
      prevTheme.isCustom = !prevTheme?.isCustom;
      return { ...prevTheme };
    });
  };

  return (
    <>
      <Grid item container direction="column" spacing={4}>
        <Grid item>
          <FormControl variant="outlined" className={classes.select}>
            <InputLabel id="theme-select-label">Theme Mode</InputLabel>
            <Select
              labelId="theme-select-label"
              label="Theme Mode"
              name="theme"
              value={theme?.isCustom ? "custom" : "system"}
              onChange={handleThemeChange}
            >
              <MenuItem value="custom">Custom Theme</MenuItem>
              <MenuItem value="system">System Theme</MenuItem>
            </Select>
            <FormHelperText>
              {theme?.isCustom ? "ToDo will use your selected theme" : "ToDo theme will match your system active settings"}
            </FormHelperText>
          </FormControl>
        </Grid>
        {theme?.isCustom ? <CustomTheme theme={theme} setTheme={setTheme} /> : <SystemTheme theme={theme} setTheme={setTheme} />}
      </Grid>
    </>
  );
};

export default ThemeForm;
