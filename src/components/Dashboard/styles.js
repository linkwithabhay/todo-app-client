import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  fullPage: {
    height: "calc(100vh - 64px)",
    overflow: "hidden auto",
  },
  gridRoot: {
    gap: "3rem 1rem",
    [theme.breakpoints.down("sm")]: {
      gap: "6rem 1rem",
    },
  },
  gridContainer: {
    gap: "1rem",
    padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
    },
  },
  gridItemContainer: {
    gap: "1rem",
    "& > div": {
      padding: "1rem 0.5rem",
      [theme.breakpoints.down("xs")]: {
        padding: "0.5rem",
      },
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up(0)]: {
      minHeight: "64px",
    },
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
  },
  contentWithDrawerOpen: {
    padding: theme.spacing(3),
    paddingRight: 0,
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down(1780)]: {
      paddingLeft: drawerWidth,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(7) + 1,
    },
  },
  contentWithDrawerClose: {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(7) + 1,
    paddingRight: 0,
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  todoItem: {
    // position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    // "&:hover": {
    //   "&::after": {
    //     content: "attr(data-todo-type)",
    //     position: "absolute",
    //     top: theme.spacing(2),
    //     right: theme.spacing(2),
    //     padding: theme.spacing(0.5, 1),
    //     fontSize: theme.typography.pxToRem(12),
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: theme.palette.background.paper,
    //   },
    // },
  },
  todoListItem: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    // "& .todoListItemToggleButton": {
    //   // visibility: "hidden",
    // },
    // "&:hover, &:focus": {
    //   "& .todoListItemToggleButton": {
    //     visibility: "visible",
    //   },
    // },
    "& p": {
      fontSize: theme.typography.fontSize,
    },
    "&.completedToDo": {
      "& p": {
        textDecoration: "line-through",
        color: theme.palette.text.secondary,
      },
    },
  },
  greenIcon: {
    color: theme.palette.success.main,
  },
  pinIcon: {
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex,
    }),
    "&.pinned": {
      transform: "rotate(45deg)",
      color: theme.palette.secondary.main,
    },
  },
}));
