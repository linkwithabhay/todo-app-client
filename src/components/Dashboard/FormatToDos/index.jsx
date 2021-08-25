import React from "react";

// Material UI
import useStyles from "../styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const Index = (props) => {
  const { edit } = props;
  const classes = useStyles();
  return (
    <>
      <Grid component={Paper} elevation={0} item container justifyContent="center" className={classes.gridContainer}>
        <Grid item>
          <Typography variant="h5">{edit === undefined ? "Create a ToDo" : "Edit ToDo"}</Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default Index;
