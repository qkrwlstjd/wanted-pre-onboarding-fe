import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TodoItem from "./component/TodoItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

async function setTodos(todo) {
  const token = localStorage.getItem("access_token");
  return fetch(
    "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/production/todos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(todo),
    }
  ).then((data) => data.json());
}

async function getTodos() {
  const token = localStorage.getItem("access_token");
  return fetch(
    "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/production/todos",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  ).then((data) => data.json());
}

export default function Profile() {
  const classes = useStyles();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  async function fetchTodo() {
    const data = await getTodos();
    setTodoList(data);
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setTodos({
      todo,
    });

    await getTodos();
    setTodo("");
    fetchTodo();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit} style={{ display: "flex", margin: 10 }}>
        <TextField
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="TODO"
          inputProps={{
            "aria-label": "Description",
          }}
          style={{ width: "89%", marginRight: "1%" }}
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          style={{ width: "10%" }}
        >
          Add
        </Button>
      </form>
      <Grid container>
        {todoList &&
          todoList.map((ele) => {
            return <TodoItem key={ele.id} todo={ele} fetchTodo={fetchTodo} />;
          })}
      </Grid>
    </div>
  );
}
