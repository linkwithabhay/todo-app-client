import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material UI
import { Avatar, Button, Paper, Grid, Typography, Container, FormControlLabel, Checkbox } from "@material-ui/core"; // Components
import { LockOutlined } from "@material-ui/icons"; // Icons
import useStyles from "./styles"; // Styles

// Components
import Input from "./Input";

// Actions
import { signin, signup } from "../../actions/auth";

// Constants
// import { AUTH } from "../../constants/actionTypes";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle Boolean to Show Password
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  // Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Switch between SignIn and SignUp
  const switchMode = () => {
    setFormData(initialState);
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Sign {isSignUp ? "Up" : "In"}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus={isSignUp} half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus={!isSignUp} />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
              <FormControlLabel control={<Checkbox onChange={handleShowPassword} color="primary" />} label="Show Password" />
            </Grid>
            <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            {/* <GoogleLogin
              clientId="374108732126-q8v3rt8k9qhoa3496j8iunikcft46g7f.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained">
                  Sign In with Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            /> */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? (
                    <>
                      <span style={{ fontWeight: "400" }}>Already have an account?</span>
                      &nbsp;
                      <Typography component="span" color="primary" style={{ fontWeight: "600" }}>
                        Sign In
                      </Typography>
                    </>
                  ) : (
                    <>
                      <span style={{ fontWeight: "400" }}>Don't have an account?</span>
                      &nbsp;
                      <Typography component="span" color="primary" style={{ fontWeight: "600" }}>
                        Sign Up
                      </Typography>
                    </>
                  )}
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
