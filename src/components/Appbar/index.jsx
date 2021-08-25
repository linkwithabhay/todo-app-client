import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material UI
import useStyles from "./styles";
import { MenuRounded } from "@material-ui/icons";
// prettier-ignore
import { AppBar, Avatar, Divider, Hidden, IconButton, SwipeableDrawer, Toolbar, Tooltip } from "@material-ui/core";

// Icons
import { LogoImgPath } from "../../assets/images";

// Components
import Account from "./Account";
import DrawerList from "./DrawerList";

// Constants
import { START_LOADING, STOP_LOADING, THEME } from "../../constants/actionTypes";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

const Index = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("ToDo-App-profile")));
  const [appMenuDrawerOpen, setAppMenuDrawerOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme", {
    isCustom: false,
    custom: {
      variant: "dark",
    },
    system: {
      sysVariant: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    },
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    // const token = user?.token;
    // if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }
    setUser(JSON.parse(localStorage.getItem("ToDo-App-profile")));
    if (location.pathname !== "/settings/appearance") {
      console.log("Added listener");
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSystemThemeChange);
    }
    return () => {
      if (location.pathname !== "/settings/appearance") {
        console.log("Removed listener");
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onSystemThemeChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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

  const handleAppMenuDrawerToggle = () => {
    setAppMenuDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Hidden mdUp>
            <Tooltip title="Menu" aria-label="menu">
              <IconButton onClick={handleAppMenuDrawerToggle}>
                <MenuRounded className={`${classes.smallIcon} ${classes.whiteIcon}`} />
              </IconButton>
            </Tooltip>
          </Hidden>

          <Tooltip title="ToDo App" aria-label="ToDo Home Page">
            <IconButton component={Link} to="/">
              <Avatar alt="Logo" src={LogoImgPath}></Avatar>
            </IconButton>
          </Tooltip>

          {user?.result && (
            <>
              <Account />
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}></div>
      <Hidden mdUp>
        <SwipeableDrawer
          variant="temporary"
          anchor="top"
          className={classes.drawer}
          open={appMenuDrawerOpen}
          onClose={handleAppMenuDrawerToggle}
          onOpen={() => setAppMenuDrawerOpen(true)}
        >
          <div className={classes.toolbar}></div>
          <Divider />
          <DrawerList />
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};

export default Index;
