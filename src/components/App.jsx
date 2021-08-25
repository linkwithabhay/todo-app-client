import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// Material UI
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { blue, deepPurple } from "@material-ui/core/colors";

// Custom Components
import Appbar from "./Appbar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { SignUp, SignIn, ReValidate } from "./Auth";
import Settings from "./Settings";

const basicTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple[500],
    },
    action: {
      checked: blue[500],
    },
  },
  overrides: {
    MuiRadio: {
      colorSecondary: {
        "&.Mui-checked": {
          color: blue[500],
        },
      },
    },
  },
});

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      <ThemeProvider theme={{ ...basicTheme, ...theme }}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />

            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/dashboard" exact>
              <Appbar />
              <Dashboard />
            </Route>

            <Redirect exact from="/settings" to="/settings/profile" />

            <Route path="/settings/:activeSetting" exact>
              <Appbar />
              <Settings />
            </Route>
            <Route path="/settings/:activeSetting/revalidate" exact>
              <ReValidate />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
