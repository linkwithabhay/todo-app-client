import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { DashboardRounded, Settings } from "@material-ui/icons";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const DrawerList = () => {
  return (
    <nav>
      <List>
        <li>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardRounded />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </li>

        <li>
          <ListItem button disabled component={Link} to="/dashboard">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Another</ListItemText>
          </ListItem>
        </li>

        <li>
          <ListItem button disabled component={Link} to="/dashboard">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Another</ListItemText>
          </ListItem>
        </li>

        <li>
          <ListItem button component={Link} to="/settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </li>
      </List>
    </nav>
  );
};

export default DrawerList;
