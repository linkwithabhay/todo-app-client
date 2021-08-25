import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Hooks
import useLocalStorage from "../../hooks/useLocalStorage";

// Material UI
import useStyles from "./styles";
// prettier-ignore
import { Container, Grid, withWidth } from "@material-ui/core";

// Components
import DashboardDrawer from "./DashboardDrawer";
import PinnedToDos from "./PinnedToDos";
// import FormatToDos from "./FormatToDos";
import ToDos from "./ToDos";

const Index = (props) => {
  const { width } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("ToDo-App-profile")));
  const [appState, setAppState] = useLocalStorage("state", {
    drawerOpen: width === "xs" ? false : true,
    recentOpen: width === "xs" ? false : true,
  });
  const [states, setStates] = useState({
    drawerOpen: width === "xs" ? false : appState?.drawerOpen,
    recentOpen: width === "xs" ? false : appState?.recentOpen,
  });
  states.recentOpen = states.drawerOpen ? states.recentOpen : false;
  const [todos, setTodos] = useLocalStorage("data-todos", {
    todo0: {
      variant: "note",
      pinned: false,
      heading: "First Note",
      data: "Hey, this is my first note.",
    },
    todo1: {
      variant: "bullet",
      pinned: false,
      heading: "First Bullet",
      data: {
        bullet0: {
          checked: false,
          text: "This is my first bullet point.",
        },
        bullet1: {
          checked: false,
          text: "This is my second bullet point.",
        },
      },
    },
    todo2: {
      variant: "checkbox",
      pinned: false,
      heading: "First Checkbox",
      data: {
        checkbox0: {
          checked: true,
          text: "This is my first list item. It is a long one. Is there any effect of this one? If so, are they removed?",
        },
        checkbox1: {
          checked: false,
          text: "This is my second list item.",
        },
      },
    },
  });
  const [pinnedTodos, setPinnedTodos] = useLocalStorage("data-pinned", {});
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("ToDo-App-profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!user?.token) {
    // ! use jwt-decode module to get expire date and redirect to login if JWT expires
    return <Redirect to="/" />;
  }

  // console.count("Dashboard Render Count");

  return (
    <>
      <Container maxWidth="xl" component="main" style={{ overflow: "hidden" }}>
        <DashboardDrawer states={states} setStates={setStates} appState={appState} setAppState={setAppState} />
        <Grid
          container
          direction={width === "sm" || width === "xs" ? "column-reverse" : "row"}
          alignItems={width === "sm" || width === "xs" ? "center" : "flex-start"}
          wrap={width === "xs" || width === "sm" ? "wrap" : "nowrap"}
          className={`${classes.gridRoot} ${states.drawerOpen ? classes.contentWithDrawerOpen : classes.contentWithDrawerClose}`}
        >
          <Grid item container xs={12} md={6} justifyContent="center">
            <ToDos todos={todos} setTodos={setTodos} pinnedTodos={pinnedTodos} setPinnedTodos={setPinnedTodos} />
          </Grid>
          <Grid item container xs={12} md={6} alignItems="center" direction="column" className={classes.gridRoot}>
            <PinnedToDos todos={todos} setTodos={setTodos} pinnedTodos={pinnedTodos} setPinnedTodos={setPinnedTodos} />
            {/* <FormatToDos /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Index.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(Index);
