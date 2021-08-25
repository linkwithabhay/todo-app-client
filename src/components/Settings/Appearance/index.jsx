import React from "react";
import { useSelector } from "react-redux";

// Material UI
import useStyles from "../styles";
// prettier-ignore
import {CircularProgress, Divider, Grid, Typography} from "@material-ui/core";

// Components
import ThemeForm from "./ThemeForm";
import { Done } from "@material-ui/icons";

const Index = () => {
  const { isLoading } = useSelector((state) => state.isLoading);
  const classes = useStyles();

  return (
    <>
      <Grid item container xs={12} sm={8} md={9} spacing={4}>
        <Grid item xs={12}>
          <Grid item container alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Theme Preferences</Typography>
            {isLoading ? (
              <>
                <CircularProgress color="inherit" size="1.2rem" />
              </>
            ) : (
              <>
                <Done className={classes.greenIcon} fontSize="small" />
              </>
            )}
          </Grid>
          <Divider style={{ margin: "0.5rem 0" }} />
          <Typography variant="body1">
            Choose how ToDo looks to you. Select a single theme, or sync with your system and automatically switch between day and night
            themes.
          </Typography>
        </Grid>

        <ThemeForm />

        {/* <Grid item xs={12}>
          <Grid item>
            <Typography variant="h5" color="textSecondary">
              Appearence Settings
            </Typography>
          </Grid>
          <Divider style={{ margin: "0.5rem 0" }} />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Index;
