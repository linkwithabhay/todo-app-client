import React from "react";

// Material UI
import useStyles from "../styles";
import { Edit } from "@material-ui/icons";
import { Grid, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import PinnedImg from "../../../assets/images/PinnedImg";

const Index = (props) => {
  const { todos, setTodos, pinnedTodos, setPinnedTodos } = props;
  const classes = useStyles();

  const handleToDoPinned = (parentKey, todoKey) => {
    todos[todoKey].pinned = false;
    setTodos({ ...todos });
    delete pinnedTodos[parentKey];
    setPinnedTodos({ ...pinnedTodos });
  };

  // console.count("Dashboard PinnedTodos Render Count");

  return (
    <>
      <Grid component={Paper} elevation={0} item container justifyContent="center" className={classes.gridContainer}>
        <Grid item>
          <Typography variant="h5">Pinned ToDos</Typography>
        </Grid>
        <Grid item container direction="column" spacing={0} className={classes.gridItemContainer}>
          {pinnedTodos && Object.entries(pinnedTodos)[0]?.length > 1 ? (
            <>
              {Object.entries(pinnedTodos).map(([parentKey, pinned]) => (
                <Grid
                  key={parentKey}
                  item
                  container
                  direction="column"
                  style={{ gap: "0.5rem" }}
                  className={classes.todoItem}
                  data-todo-type={pinned?.todoVariant}
                >
                  <Grid item container direction="row" wrap="nowrap" alignItems="center" justifyContent="space-between">
                    <Grid item container wrap="nowrap" alignItems="center">
                      <Grid item>
                        <Tooltip title="Edit" aria-label="edit current todo">
                          <IconButton size="medium">
                            <Edit color="secondary" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid zeroMinWidth item>
                        <Typography noWrap variant="h6">
                          {pinned?.todoHeading}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Remove" aria-label="remove pin from current todo">
                        <IconButton size="medium" onClick={() => handleToDoPinned(parentKey, pinned?.todoKey)}>
                          <PinnedImg size="18px" className={`${classes.pinIcon} pinned`} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <Grid item container justifyContent="center" alignItems="center" className={classes.todoItem}>
                <Grid item>
                  <Typography>No pinned ToDo</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
