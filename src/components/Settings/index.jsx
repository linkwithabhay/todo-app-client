import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// Material UI
import useStyles from "./styles";
// prettier-ignore
import { Avatar, Container, Grid, Typography } from "@material-ui/core";

// Components
import AccountSettingsList from "./AccountSettingsList";
import ActiveSetting from "./ActiveSetting";

const Index = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("ToDo-App-profile")));
  const classes = useStyles();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("ToDo-App-profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user?.token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.main} component="main">
        <Grid container spacing={4}>
          <Grid item container wrap="nowrap" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                className={`${classes.bigAvatar} ${classes.lightPurple}`}
                src={user?.result?.imageUrl}
                alt={`${user?.result?.name} Avatar`}
              >
                {user?.result?.name?.charAt(0)}
              </Avatar>
            </Grid>

            <Grid item zeroMinWidth>
              <Typography noWrap variant="h5">
                {user?.result?.name}
              </Typography>
              <Typography noWrap variant="body2">
                Your personal account
              </Typography>
            </Grid>
          </Grid>

          <Grid item container spacing={4}>
            <AccountSettingsList />
            <ActiveSetting />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
