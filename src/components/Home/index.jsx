import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

// Constants
import { START_LOADING, STOP_LOADING, THEME } from "../../constants/actionTypes";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

import TestSignIn from "./TestSignIn"; // Delete before publish and remove from gitignore
import { Button, Grid } from "@material-ui/core";

const Index = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("ToDo-App-profile"));
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

  if (user?.token) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
        <h1>Home Page</h1>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" style={{ gap: "1rem", margin: "1rem 0" }}>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/signin">
            Sign In
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/signup">
            Sign Up
          </Button>
        </Grid>
      </Grid>
      <TestSignIn />
    </>
  );
};

export default Index;
