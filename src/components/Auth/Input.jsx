import React from "react";
// Material UI Components
import { Grid, TextField } from "@material-ui/core";

const Input = ({ name, label, autoFocus, type, defaultValue, value, half, handleChange, error }) => {
  return (
    <>
      <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
          name={name}
          type={type || "text"}
          label={label}
          defaultValue={defaultValue}
          value={value}
          autoFocus={autoFocus}
          onChange={handleChange}
          error={error}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
    </>
  );
};

export default Input;
