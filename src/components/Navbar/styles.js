import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  bigIcon: {
    fontSize: "2.5rem",
  },
  whiteIcon: {
    color: theme.palette.common.white,
  },
  menuItem: {
    margin: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));
