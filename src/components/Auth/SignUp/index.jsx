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

// Actions
import { signup } from "../../../actions/auth";
import { ERROR } from "../../../constants/actionTypes";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Index = () => {
  const { isLoading } = useSelector((state) => state.isLoading);
  const { errorData } = useSelector((state) => state.error);
  const [alertData, setAlertData] = useState(undefined);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setAlertData(errorData);
  }, [errorData]);

  // Toggle Boolean to Show Password
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertData(undefined);
    dispatch(signup(formData, history));
  };

  // Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitch = () => {
    dispatch({ type: ERROR, data: null });
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
      <Container maxWidth="sm" className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <Link to="/">
            <Avatar src={LogoImgPath} className={classes.avatar}></Avatar>
          </Link>
          <Typography variant="h5" component="h1">
            Sign Up
            {/* {isSignUp ? "Up" : "In"} */}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                error={alertData?.type === "emailExists" && Boolean(formData.email)}
              />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} half />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                half
                error={formData.password !== formData.confirmPassword && Boolean(formData.confirmPassword)}
              />
              <Grid item container xs={12} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox checked={showPassword} onChange={handleShowPassword} color="primary" />}
                    label="Show Password"
                  />
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
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SignInUpImg />}
                  disabled={formData.password !== formData.confirmPassword}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.button} color="primary" onClick={handleSwitch} component={Link} to="signin">
                  Sign In instead
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
