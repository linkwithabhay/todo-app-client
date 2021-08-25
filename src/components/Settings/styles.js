import { makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  fullPage: {
    minHeight: "100vh",
  },
  main: {
    padding: theme.spacing(4),
  },
  biggerAvatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    fontSize: theme.spacing(12),
  },
  bigAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontSize: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      fontSize: theme.spacing(3),
    },
  },
  settingsNavItem: {
    position: "relative",
    "&.activeSetting::before": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  select: {
    width: "100%",
    minWidth: "200px",
  },
  customRadioLabel: {
    width: "200px",
    height: "200px",
    position: "relative",
    overflow: "hidden",
    margin: 0,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,

    "& .MuiFormControlLabel-label": {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      overflow: "hidden",
      padding: 0,
      border: 0,

      borderRadius: theme.shape.borderRadius,
    },

    "& .radio__inside__label": {
      position: "absolute",
      top: "auto",
      bottom: -2,
      left: -2,
      right: -2,
      zIndex: 2,
      borderRadius: 0,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      borderTop: `1px solid ${theme.palette.divider}`,
      justifyContent: "flex-start",
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.background.paper,
      },
      "&::after": {
        content: "attr(data-custom-radio-label)",
        fontSize: "medium",
        marginLeft: theme.spacing(2),
      },
      "&.Mui-checked": {
        borderTop: `1px solid ${theme.palette.action.checked}`,
      },
      "& .MuiIconButton-label": {
        width: "fit-content",
      },
    },
  },
  activeTheme: {
    border: `1px solid ${theme.palette.action.checked}`,
    borderRadius: theme.shape.borderRadius,
    padding: "1rem",
  },
  systemTheme: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: "1rem",
  },
  greenIcon: {
    color: theme.palette.success.main,
  },
  lightPurple: {
    backgroundColor: purple["A200"],
    color: theme.palette.getContrastText(purple["A200"]),
  },
}));
