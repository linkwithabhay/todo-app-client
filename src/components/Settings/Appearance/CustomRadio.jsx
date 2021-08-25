import React from "react";
// Material UI
import useStyles from "../styles";
import { FormControlLabel, Grid, makeStyles, Paper, Radio, ThemeProvider } from "@material-ui/core";

const useCustomStyles = makeStyles((theme) => ({
  customSkeleton: {
    minWidth: "200px",
    minHeight: "200px",
    padding: 0,
    margin: 0,
  },
  customSkeletonAppbar: {
    minHeight: "10%",
    backgroundColor: theme.palette.primary.main, // ! Theme not changing here
  },
}));

const CustomSkeleton = (props) => {
  const { theme } = props;
  const classes = useCustomStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper className={classes.customSkeleton} elevation={0}>
          <Grid className={classes.customSkeletonAppbar} item xs={12}>
            <Grid item container>
              {/* <Grid item xs={3}></Grid> */}
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </>
  );
};

const CustomRadioInput = (props) => {
  const { variant, theme, label, value } = props;
  const classes = useStyles();
  return (
    <>
      <FormControlLabel
        className={`${classes.customRadioLabel} ${variant === value && classes.activeTheme}`}
        label={<CustomSkeleton theme={theme} />}
        value={value}
        control={<Radio className="radio__inside__label" data-custom-radio-label={label} size="small" />}
      />
    </>
  );
};

export default CustomRadioInput;
