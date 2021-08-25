import React from "react";
// import { useDispatch } from "react-redux";

// Material UI
import useStyles from "../styles";
// prettier-ignore
import {  Chip, Grid, Typography  } from "@material-ui/core";
import { Brightness2Outlined, WbSunnyOutlined } from "@material-ui/icons";

// Components
// import { darkTheme, lightTheme } from "./themes";
// import { START_LOADING, STOP_LOADING } from "../../../constants/actionTypes";

const CustomTheme = (props) => {
  // const dispatch = useDispatch();
  const classes = useStyles();
  const { theme } = props;

  // const handleSelectThemeVariant = () => {
  //   dispatch({ type: START_LOADING });
  //   setThemeVariant((prev) => {
  //     if (prev === "dark") return "light";
  //     return "dark";
  //   });
  //   setTimeout(() => {
  //     dispatch({ type: STOP_LOADING });
  //   }, 500);
  // };

  return (
    <>
      <Grid item container style={{ gap: "1rem" }}>
        <Grid
          item
          xs={12}
          md={5}
          wrap="nowrap"
          container
          alignItems="center"
          justifyContent="space-between"
          className={`${theme?.system?.sysVariant === "light" ? classes.activeTheme : classes.systemTheme}`}
        >
          <Grid item container alignItems="center" style={{ gap: "0.8rem" }}>
            <WbSunnyOutlined fontSize="small" />
            <Typography noWrap component="span">
              Day Theme
            </Typography>
          </Grid>
          <Grid item>
            {theme?.system?.sysVariant === "light" && (
              <Chip label="Active" variant="outlined" color="primary" className={classes.greenIcon} />
            )}{" "}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          wrap="nowrap"
          container
          alignItems="center"
          justifyContent="space-between"
          className={`${theme?.system?.sysVariant === "dark" ? classes.activeTheme : classes.systemTheme}`}
        >
          <Grid item container alignItems="center" style={{ gap: "0.8rem" }}>
            <Brightness2Outlined fontSize="small" />
            <Typography noWrap component="span">
              Night Theme
            </Typography>
          </Grid>
          <Grid item> {theme?.system?.sysVariant === "dark" && <Chip label="Active" variant="outlined" color="secondary" />} </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomTheme;
