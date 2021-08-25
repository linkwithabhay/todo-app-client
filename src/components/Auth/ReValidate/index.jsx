import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Alert, AlertTitle } from "@material-ui/lab"; // Lab Components
// prettier-ignore
import { Avatar, Button, Paper, Grid, Typography, Container, FormControlLabel, Checkbox, Snackbar, CircularProgress, Backdrop } from "@material-ui/core"; // Core Components
import useStyles from "../styles"; // Styles

// Components
import Input from "../Input";
import { LogoImgPath, SignInUpImg } from "../../../assets/images";

// Actions
import { revalidate, updateuser } from "../../../actions/auth";
import { ERROR, REVALIDATE } from "../../../constants/actionTypes";

const Index = () => {
  const { reAuthData } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.isLoading);
  const { errorData } = useSelector((state) => state.error);
  const [alertData, setAlertData] = useState(undefined);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { formData, to, action } = location.state || {};
  const classes = useStyles();

  useEffect(() => {
    if (reAuthData?.authenticated) {
      if (action === "updateuser" && formData) dispatch(updateuser(formData, history, to, 1000));
    }
    if (reAuthData?.message) {
      setAlertData(reAuthData);
    } else if (errorData?.message) {
      setAlertData(errorData);
    } else {
      setAlertData(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData, reAuthData]);

  if (!action && !to) {
    return <Redirect to="/settings" />;
  }

  // Toggle Boolean to Show Password
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  // Form Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();

    setAlertData(undefined);
    dispatch({ type: ERROR, data: null });
    dispatch(revalidate({ password }));
  };

  // Input Change Handler
  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: ERROR, data: null });
    dispatch({ type: REVALIDATE, data: null });
    setAlertData(undefined);
  };

  return (
    <>
      <Snackbar
        className={classes.snackbar}
        open={Boolean(alertData?.message)}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key="topRight"
      >
        <Alert onClose={handleAlertClose} severity={reAuthData?.severity || errorData?.severity || "error"}>
          <AlertTitle style={{ textTransform: "capitalize" }}>{reAuthData?.severity || errorData?.severity || "error"}</AlertTitle>
          {reAuthData?.message || errorData?.message}
        </Alert>
      </Snackbar>
      {isLoading && (
        <>
          <Backdrop open={isLoading} className={classes.backdrop}>
            <CircularProgress size="3rem" />
          </Backdrop>
        </>
      )}
      <Container maxWidth="xs" className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <Link to="/">
            <Avatar src={LogoImgPath} className={classes.avatar}></Avatar>
          </Link>
          <Typography variant="h5" component="h1">
            Confirm Access
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                autoFocus
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                error={alertData?.type === "invalid" && Boolean(password)}
              />
              <Grid item container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox checked={showPassword} onChange={handleShowPassword} color="primary" />}
                    label="Show Password"
                  />
                </Grid>
                <Grid item>
                  <Button className={classes.button} disabled>
                    Forgot Password?
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="center" spacing={2} className={classes.submit}>
              <Grid item xs={12}>
                <Button className={classes.button} type="submit" variant="contained" color="primary" fullWidth startIcon={<SignInUpImg />}>
                  Confirm Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Index;
