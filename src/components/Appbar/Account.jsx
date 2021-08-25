import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material UI
import { PersonAdd, PhotoCamera } from "@material-ui/icons";
// prettier-ignore
import { Avatar, Badge, Button, Chip, Divider, Fab, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Popover, Tooltip, Typography } from "@material-ui/core";
import useStyles from "./styles";

import { SignOutImg } from "../../assets/images";
import { LOGOUT } from "../../constants/actionTypes";

const Account = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("ToDo-App-profile")));
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("ToDo-App-profiles")));
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("ToDo-App-profile")));
    setUsers(JSON.parse(localStorage.getItem("ToDo-App-profiles")));
  }, [location]);

  const logout = () => {
    dispatch({ type: LOGOUT, data: user });
    window.location.reload();
    history.push("/");
    setUser(JSON.parse(localStorage.getItem("ToDo-App-profile")));
    setUsers(JSON.parse(localStorage.getItem("ToDo-App-profiles")));
  };

  const handleAccountMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountShift = (filteredUser) => {
    localStorage.setItem("ToDo-App-profile", JSON.stringify(filteredUser));
    setUser(filteredUser);
    history.push("/");
  };

  let usersArray = [];
  for (let key in users) {
    if (user?.result?.email !== users[key]?.result?.email) {
      usersArray.push(users[key]);
    }
  }
  return (
    <>
      <Tooltip
        title={
          <>
            <Typography style={{ fontWeight: "500", fontSize: "12px", color: "#ffffff" }}>ToDo Account</Typography>
            <Typography style={{ fontWeight: "400", fontSize: "12px", color: "#bdc1c6" }}>{user?.result?.name}</Typography>
            <Typography style={{ fontWeight: "400", fontSize: "12px", color: "#bdc1c6" }}>{user?.result?.email}</Typography>
          </>
        }
        aria-label="account"
      >
        <IconButton aria-controls="account-menu" onClick={handleAccountMenuClick} aria-haspopup="true">
          <Avatar
            className={`${classes.smallAvatar} ${classes.lightPurple}`}
            src={user?.result?.imageUrl}
            alt={`${user?.result?.name} Avatar`}
          >
            {user?.result?.name?.charAt(0)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Popover
        style={{ zIndex: "1302" }}
        className={classes.accountPopover}
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAccountMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        BackdropProps={{ invisible: false }}
      >
        <Grid container className={classes.menuItem} spacing={3}>
          <Grid item zeroMinWidth>
            <Typography noWrap>Signed in as</Typography>
          </Grid>

          <Grid item className={classes.itemContentContainer}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <>
                  <Fab disabled color="primary" className={classes.badgeAvatar}>
                    <PhotoCamera />
                  </Fab>
                </>
              }
            >
              <Avatar
                className={`${classes.bigAvatar} ${classes.lightPurple}`}
                src={user?.result?.imageUrl}
                alt={`${user?.result?.name} Avatar`}
              >
                {user?.result?.name?.charAt(0)}
              </Avatar>
            </Badge>
          </Grid>

          <Grid item container className={classes.itemContentContainer}>
            <Grid item zeroMinWidth>
              <Typography noWrap variant="h5">
                {user?.result?.name}
              </Typography>
            </Grid>
            <Grid item zeroMinWidth>
              <Typography noWrap variant="body1">
                {user?.result?.email}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container className={classes.itemContentContainer}>
            <Grid item>
              <Chip label="Manage Your ToDo Account" variant="outlined" component={Link} to="/settings" clickable />
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <List dense style={{ margin: "0 8px" }} aria-label="linked accounts container">
          {Boolean(usersArray.length) && (
            <>
              {usersArray.map((userObject, index) => (
                <li key={userObject?.result?.email}>
                  <ListItem button onClick={() => handleAccountShift(userObject)}>
                    <ListItemAvatar>
                      <Avatar
                        className={`${classes.lightPurple}`}
                        src={userObject?.result?.imageUrl}
                        alt={`${userObject?.result?.name} Avatar`}
                      >
                        {userObject?.result?.name?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText>
                      <Typography component="p" variant="subtitle1">
                        {userObject?.result?.name}
                      </Typography>
                      <Typography component="p" variant="subtitle2">
                        {userObject?.result?.email}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  {index < usersArray.length - 1 && (
                    <>
                      <Divider variant="inset" />
                    </>
                  )}
                </li>
              ))}
            </>
          )}
        </List>

        <Divider variant="middle" />

        <List component="div" dense style={{ margin: "0 8px" }}>
          <ListItem button component={Link} to="/signin">
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText>Add another account</ListItemText>
          </ListItem>
        </List>

        <Divider />

        <List component="div">
          <ListItem alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SignOutImg />}
              fullWidth
              component={Link}
              to="/"
              onClick={() => {
                handleAccountMenuClose();
                logout();
              }}
            >
              Sign Out
            </Button>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default Account;
