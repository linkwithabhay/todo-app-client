import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Material UI
import useStyles from "../styles";
// prettier-ignore
import { Folder, MenuOpen, History, Description, ExpandLess, ExpandMore } from "@material-ui/icons";
// prettier-ignore
import { Collapse, Divider,  List, ListItem, ListItemIcon, ListItemText, Paper, SwipeableDrawer, withWidth } from "@material-ui/core";

const Index = (props) => {
  const { width, states, setStates, appState, setAppState } = props;
  const classes = useStyles();

  useEffect(() => {
    // setAppState({...appState});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  const handleDrawer = () => {
    if (states.drawerOpen === appState.drawerOpen) {
      appState.drawerOpen = !appState?.drawerOpen;
    }
    states.drawerOpen = !states.drawerOpen;

    if (!states.drawerOpen) {
      states.recentOpen = false;
      // appState.recentOpen = false;
    } else {
      if (appState.recentOpen) {
        states.recentOpen = true;
      }
    }

    setStates({ ...states });
    setAppState({ ...appState });
  };

  const handleRecentCollapse = () => {
    if (states.recentOpen === appState.recentOpen) {
      appState.recentOpen = !appState.recentOpen;
    }
    states.recentOpen = !states.recentOpen;

    if (states.recentOpen) {
      states.drawerOpen = true;
      appState.drawerOpen = true;
    }

    setStates({ ...states });
    setAppState({ ...appState });
  };

  const transOpen = "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";
  const transClose = "width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms";

  // console.count("DashboardDrawer Render Count");

  return (
    <>
      <SwipeableDrawer
        style={width === "xs" ? (states.drawerOpen ? { transition: transOpen } : { transition: transClose }) : {}}
        variant={width === "xs" && states.drawerOpen ? "temporary" : "permanent"}
        anchor="left"
        open={true}
        onOpen={() => {
          states.drawerOpen = true;
          setStates({ ...states });
        }}
        onClose={() => {
          states.drawerOpen = false;
          states.recentOpen = false;
          appState.drawerOpen = false;
          setAppState({ ...appState });
          setStates({ ...states });
        }}
        className={`${classes.drawer} ${states.drawerOpen ? classes.drawerOpen : classes.drawerClose}`}
        classes={{ paper: states.drawerOpen ? classes.drawerOpen : classes.drawerClose }}
      >
        <Paper elevation={0}>
          <div className={classes.toolbar} />
          <List component="div">
            <ListItem button role="button" aria-label="Open drawer" onClick={handleDrawer}>
              <ListItemIcon>
                <MenuOpen />
              </ListItemIcon>
              <ListItemText>Close Drawer</ListItemText>
            </ListItem>
          </List>

          <Divider />

          <List>
            <li>
              <List>
                <ListItem role="button" aria-label="Open recent" selected={states.recentOpen} button onClick={handleRecentCollapse}>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText>Recent</ListItemText>
                  {states.recentOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <li>
                  <Collapse in={states.recentOpen}>
                    <List style={{ paddingLeft: "56px" }}>
                      <ListItem>
                        <ListItemIcon>
                          <Folder />
                        </ListItemIcon>
                        <ListItemText>Folder</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Description />
                        </ListItemIcon>
                        <ListItemText>File</ListItemText>
                      </ListItem>
                    </List>
                  </Collapse>
                </li>
              </List>
            </li>
          </List>

          <Divider />

          <List>
            <ListItem>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText>Folder</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </SwipeableDrawer>
    </>
  );
};
Index.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(Index);
