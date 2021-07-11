import React from "react";
// Material UI Components
import { Grid, TextField } from "@material-ui/core";

const Input = ({ name, label, autoFocus, type, half, handleChange, handleShowPassword }) => {
  return (
    <>
      <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
          name={name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label={label}
          autoFocus={autoFocus}
          type={type}
        />
      </Grid>
    </>
  );
};

export default Input;
