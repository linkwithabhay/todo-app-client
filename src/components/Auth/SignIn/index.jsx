import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Alert } from "@material-ui/lab"; // Lab Components
// prettier-ignore
import { Avatar, Button, Paper, Grid, Typography, Container, FormControlLabel, Checkbox, Snackbar, CircularProgress, Backdrop } from "@material-ui/core"; // Core Components
import useStyles from "../styles"; // Styles

// Components
import Input from "../Input";
import { LogoImgPath, SignInUpImg } from "../../../assets/images";
import useLocalStorage from "../../../hooks/useLocalStorage";

// Actions
import { signin } from "../../../actions/auth";

// Constants
import { ERROR, START_LOADING, STOP_LOADING, THEME } from "../../../constants/actionTypes";

const initialState = {
  email: "",
  password: "",
};

const Index = () => {
  const { isLoading } = useSelector((state) => state.isLoading);
  const { errorData } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [alertData, setAlertData] = useState(undefined);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
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
    setAlertData(errorData);
  }, [errorData]);

  useEffect(() => {
    console.log("Added Listener");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSystemThemeChange);
    return () => {
      console.log("Removed Listener");
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onSystemThemeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSystemThemeChange = (event) => {
    if (window.location.pathname !== "/settings/appearance") {
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
    }
  };

  // Toggle Boolean to Show Password
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  // Form Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertData(undefined);
    dispatch(signin(formData, history));
  };

  const handleSwitch = () => {
    dispatch({ type: ERROR, data: null });
  };

  // Input Change Handler
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
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
        <Alert onClose={handleAlertClose} severity={errorData?.severity || "error"}>
          {errorData?.message}
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
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                autoFocus
                error={alertData?.type === "invalid" && Boolean(formData.email)}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                error={alertData?.type === "invalid" && Boolean(formData.password)}
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
            <Grid
              container
              direction="row-reverse"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              className={classes.submit}
            >
              <Grid item>
                <Button className={classes.button} type="submit" variant="contained" color="primary" startIcon={<SignInUpImg />}>
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.button} color="primary" onClick={handleSwitch} component={Link} to="/signup">
                  Create Account
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
