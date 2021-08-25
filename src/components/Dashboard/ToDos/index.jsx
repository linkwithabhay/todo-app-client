import React, { useState } from "react";

// Material UI
import useStyles from "../styles";
import { CheckBox, CheckBoxOutlineBlank, Edit, MoreVert } from "@material-ui/icons";
// prettier-ignore
import { Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Tooltip, Typography } from "@material-ui/core";
import PinnedImg from "../../../assets/images/PinnedImg";

const Index = (props) => {
  const { todos, setTodos, pinnedTodos, setPinnedTodos } = props;
  // const [alertMsg, setAlertMsg] = useState("");
  const [todoMenu, setTodoMenu] = useState({
    anchor: null,
    parentKey: undefined,
  });
  const classes = useStyles();

  const handleToDoCompletion = (parentKey, childKey) => {
    todos[parentKey].data[childKey].checked = !todos[parentKey].data[childKey].checked;
    setTodos({ ...todos });
  };

  const handleToDoPinned = (parentKey) => {
    todos[parentKey].pinned = !todos[parentKey].pinned;
    setTodos({ ...todos });
    if (todos[parentKey]?.pinned) {
      const matchedKey = Object.keys(pinnedTodos).find((key) => pinnedTodos[key]?.todoKey === parentKey);
      if (!matchedKey) {
        const len = Object.keys(pinnedTodos)?.length;
        pinnedTodos[`pinned${len}`] = {
          todoKey: parentKey,
          todoHeading: todos[parentKey]?.heading,
          todoVariant: todos[parentKey]?.variant,
        };
      }
    } else {
      const deleteKey = Object.keys(pinnedTodos).find((key) => pinnedTodos[key]?.todoKey === parentKey);
      delete pinnedTodos[deleteKey];
    }
    setPinnedTodos({ ...pinnedTodos });
  };

  const handleTodoMenuOpen = (event, parentKey) => {
    setTodoMenu({ ...todoMenu, parentKey, anchor: event.currentTarget });
  };

  const handleTodoMenuClose = (event) => {
    setTodoMenu({ ...todoMenu, parentKey: undefined, anchor: null });
  };

  // console.count("Dashboard Todo Render Count");
  // console.log("-------------------------------");

  return (
    <>
      <Grid component={Paper} elevation={0} item container justifyContent="center" className={classes.gridContainer}>
        <Grid item>
          <Typography variant="h5">ToDos</Typography>
        </Grid>
        <Grid item container direction="column" className={classes.gridItemContainer}>
          {todos && Object.entries(todos)[0]?.length > 1 ? (
            <>
              {Object.entries(todos).map(([parentKey, todo]) => (
                <Grid
                  key={parentKey}
                  id={parentKey}
                  item
                  container
                  direction="column"
                  style={{ gap: "0.5rem" }}
                  className={classes.todoItem}
                  data-todo-type={todo?.variant}
                >
                  <Grid item container direction="row" wrap="nowrap" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Grid item container wrap="nowrap" alignItems="center" className={classes.gridRoot}>
                      <Grid zeroMinWidth item style={{ paddingLeft: "0.8rem" }}>
                        <Typography noWrap variant="h6">
                          {todo?.heading}
                        </Typography>
                      </Grid>
                      {todo?.pinned && (
                        <>
                          <Grid item>
                            <PinnedImg aria-label="todo pinned" size="14px" className={`${classes.pinIcon} pinned`} />
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Grid item>
                      <Tooltip title="More" aria-label="more todo options">
                        <IconButton
                          size="medium"
                          onClick={(event) => handleTodoMenuOpen(event, parentKey)}
                          aria-controls={`${parentKey}-menu`}
                          aria-haspopup="true"
                          aria-label="more"
                        >
                          <MoreVert fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {todo?.variant === "bullet" || todo?.variant === "checkbox" ? (
                      <>
                        <List>
                          {Object.entries(todo?.data).map(([childKey, data]) => (
                            <ListItem className={`${classes.todoListItem} ${data?.checked ? "completedToDo" : ""}`} key={childKey}>
                              <Typography>{data?.text}</Typography>
                              <Tooltip title="Check" aria-label="is todo completed?">
                                <IconButton
                                  size="small"
                                  onClick={() => handleToDoCompletion(parentKey, childKey)}
                                  className="todoListItemToggleButton"
                                >
                                  {data?.checked ? (
                                    <CheckBox fontSize="inherit" color="disabled" />
                                  ) : (
                                    <CheckBoxOutlineBlank fontSize="inherit" />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    ) : (
                      <>
                        <ListItem component={Typography} paragraph>
                          {todo?.data}
                        </ListItem>
                      </>
                    )}
                  </Grid>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <Grid item container justifyContent="center" alignItems="center" className={classes.todoItem}>
                <Grid item>
                  <Typography>Haven't added yet?</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Menu
        id={`${todoMenu.parentKey}-menu`}
        elevation={1}
        anchorEl={todoMenu.anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(todoMenu.anchor)}
        onClose={handleTodoMenuClose}
      >
        <MenuItem disabled onClick={handleTodoMenuClose}>
          <ListItemIcon>
            <Edit color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleTodoMenuClose();
            handleToDoPinned(todoMenu.parentKey);
          }}
        >
          <ListItemIcon>
            <PinnedImg size="18px" className={`${classes.pinIcon} ${todos[todoMenu.parentKey]?.pinned ? "pinned" : ""}`} />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {todos[todoMenu.parentKey]?.pinned ? "Unpin" : "Pin"}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Index;
