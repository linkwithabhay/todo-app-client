import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    maxWidth: "480px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "0",
      margin: "0",
      maxWidth: "100%",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      minHeight: "100vh",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    padding: theme.spacing(7, 0),
  },
  button: {
    textTransform: "none",
    "& span a": {
      textDecoration: "none",
    },
  },
  snackbar: {
    zIndex: theme.zIndex.tooltip + 2,
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(3, 2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.tooltip + 1,
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));
