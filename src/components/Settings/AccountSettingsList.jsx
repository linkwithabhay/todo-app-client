import React from "react";
import { NavLink, useParams } from "react-router-dom";

// Material UI
import useStyles from "./styles";
import { Divider, Grid, List, ListItem, Paper, Typography } from "@material-ui/core";

const listItems = [
  { selectBy: "profile", to: "/settings/profile", text: "Profile" },
  { selectBy: "account", to: "/settings/account", text: "Account" },
  { selectBy: "appearance", to: "/settings/appearance", text: "Appearance" },
  { selectBy: "security", to: "/settings/security", text: "Account Security" },
  { selectBy: "billing", to: "/settings/billing", text: "Billing & Plans" },
  { selectBy: "email", to: "/settings/email", text: "Emails" },
];

const AccountSettingsList = () => {
  const { activeSetting } = useParams();
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={4} md={3}>
        <Paper aria-label="account settings" elevation={0} variant="outlined">
          <List aria-label="account settings list">
            <ListItem aria-label="account settings list heading">
              <Grid item zeroMinWidth>
                <Typography variant="h6" noWrap gutterBottom>
                  Account Settings
                </Typography>
              </Grid>
            </ListItem>

            <Divider />

            {listItems.map((item, index) => (
              <li key={item.selectBy}>
                <ListItem
                  selected={activeSetting === item.selectBy}
                  divider={index < listItems.length - 1}
                  button
                  component={NavLink}
                  exact
                  to={item.to}
                  className={classes.settingsNavItem}
                  activeClassName="activeSetting"
                >
                  <Grid item zeroMinWidth>
                    <Typography noWrap>{item.text}</Typography>
                  </Grid>
                </ListItem>
              </li>
            ))}
          </List>
        </Paper>
      </Grid>
    </>
  );
};

export default AccountSettingsList;
