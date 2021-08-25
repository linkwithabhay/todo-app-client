import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, purple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.modal + 1,
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
  accountPopover: {
    "& .MuiPopover-paper": {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        minWidth: 0,
      },
    },
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.spacing(2.5),
  },
  bigAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontSize: theme.spacing(4),
  },
  badgeAvatar: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    minHeight: theme.spacing(2.5),
    "& > span > svg": {
      fontSize: theme.spacing(1.8),
    },
  },
  smallIcon: {
    fontSize: theme.spacing(3.5),
  },
  whiteIcon: {
    color: theme.palette.common.white,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: theme.spacing(3, 6),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
    },
  },
  itemContentContainer: {
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "nowrap",
    marginBottom: "0px",
    // margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      // margin: theme.spacing(1),
    },
  },
  menuItemButton: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "fit-content",
  },
  deepPurple: {
    backgroundColor: deepPurple[500],
    color: theme.palette.getContrastText(deepPurple[500]),
  },
  lightDeepPurple: {
    backgroundColor: deepPurple["A200"],
    color: theme.palette.getContrastText(deepPurple["A200"]),
  },
  purple: {
    backgroundColor: purple[500],
    color: theme.palette.getContrastText(purple[500]),
  },
  lightPurple: {
    backgroundColor: purple["A200"],
    color: theme.palette.getContrastText(purple["A200"]),
  },
}));
