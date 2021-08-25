import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import useStyles from "../styles";
import { Edit } from "@material-ui/icons";
// prettier-ignore
import { Avatar, Badge, Button, Grid } from "@material-ui/core";

// Components
import Input from "../../Auth/Input";

const ProfileForm = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("ToDo-App-profile")));
  const initialState = {
    fullName: user?.result?.name,
  };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("ToDo-App-profile")));
  }, []);

  // Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // Form Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      history.push({
        pathname: "/settings/profile/revalidate",
        state: { formData, to: "/settings/profile", action: "updateuser" },
      });
    } catch (error) {
      console.log({ ...error });
    }
  };

  return (
    <>
      <Grid item container direction="row-reverse" justifyContent="space-between" spacing={4}>
        <Grid item container justifyContent="center" xs={12} md={5}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            badgeContent={
              <>
                <Button disabled variant="contained" color="primary">
                  <Edit />
                  &nbsp;
                  <span>Edit</span>
                </Button>
              </>
            }
          >
            <Avatar
              className={`${classes.biggerAvatar} ${classes.lightPurple}`}
              src={user?.result?.imageUrl}
              alt={`${user?.result?.name} Avatar`}
            >
              {user?.result?.name?.charAt(0)}
            </Avatar>
          </Badge>
        </Grid>

        <Grid item container xs={12} md={7} spacing={4} component="form" onSubmit={handleSubmit}>
          <Grid item container direction="column" justifyContent="space-between" xs={12} spacing={4}>
            <Grid item container direction="column" spacing={3}>
              <Grid item>
                <span>Name Update</span>
              </Grid>
              <Grid item>
                <Input type="text" name="fullName" label="Full Name" defaultValue={user?.result?.name} handleChange={handleChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" disabled={formData.fullName === user?.result?.name}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileForm;
