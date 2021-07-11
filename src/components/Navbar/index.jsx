import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import decode from "jwt-decode";
// Material UI
import { AppBar, Avatar, Box, Button, Divider, IconButton, Popover, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";

import { LOGOUT } from "../../constants/actionTypes";
import useStyles from "./styles";

const Index = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // const token = user?.token;
    // if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  const handleAccountMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Tooltip title="Menu" aria-label="menu">
              <IconButton>
                <MenuIcon className={`${classes.bigIcon} ${classes.whiteIcon}`} />
              </IconButton>
            </Tooltip>
            <Link className={classes.link} to="/">
              <Typography style={{ marginLeft: "1rem" }} variant="h4" component="h1">
                ToDo
              </Typography>
            </Link>
          </Box>
          {user?.result ? (
            <>
              <Tooltip
                title={
                  <>
                    <span>{user?.result?.name}</span>
                    <br />
                    <span>{user?.result?.email}</span>
                  </>
                }
                aria-label="account"
              >
                <IconButton aria-controls="account-menu" onClick={handleAccountMenuClick} aria-haspopup="true">
                  <Avatar src={user?.result?.imageUrl} alt={`${user?.result?.name} Avatar`}>
                    {user?.result?.name.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Popover
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAccountMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <div className={classes.menuItem}>
                  <Typography variant="h6">{user?.result?.name}</Typography>
                  <Typography variant="body1">{user?.result?.email}</Typography>
                </div>
                <Divider />
                <Button
                  className={classes.menuItem}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/"
                  onClick={() => {
                    handleAccountMenuClose();
                    logout();
                  }}
                >
                  Sign Out
                </Button>
              </Popover>
            </>
          ) : (
            <>
              <Tooltip title="Account" aria-label="Account">
                <IconButton aria-controls="account-menu" onClick={handleAccountMenuClick} aria-haspopup="true">
                  <AccountCircle className={`${classes.bigIcon} ${classes.whiteIcon}`} />
                </IconButton>
              </Tooltip>
              <Popover
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAccountMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Typography className={classes.menuItem}>No Account</Typography>
                <Divider />
                <Button
                  className={classes.menuItem}
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/auth"
                  onClick={handleAccountMenuClose}
                >
                  Sign In
                </Button>
              </Popover>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Index;
