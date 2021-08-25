import React from "react";

// Material UI
// prettier-ignore
import {Divider, Grid, Typography} from "@material-ui/core";

// Components
import ProfileForm from "./ProfileForm";

const Index = () => {
  return (
    <>
      <Grid item container xs={12} sm={8} md={9} spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5">Public Profile</Typography>
          <Divider style={{ margin: "0.5rem 0" }} />
        </Grid>

        <ProfileForm />

        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary">
            Profile Settings
          </Typography>
          <Divider style={{ margin: "0.5rem 0" }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
