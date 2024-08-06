import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function Home() {
  const [tasks, setTasks] = useState({
    active: [],
    pending: [],
    completed: [],
  });

  useEffect(() => {
    // Fetch tasks from API
    axios.get("/api/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const markAsComplete = (taskId) => {
    axios.put(`/api/tasks/${taskId}`, { status: "completed" })
      .then(response => {
        // Update the task list
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error updating task:", error);
      });
  };

  const addNewTask = (category) => {
    axios.post("/api/tasks", { category })
      .then(response => {
        // Update the task list
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <>
      <Head>
        <title>Taskboard System</title>
        <meta name="description" content="Taskboard System for managing tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Typography variant="h4" gutterBottom>
          Taskboard System
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h6">Active Tasks</Typography>
            <List>
              {tasks.active.map(task => (
                <ListItem key={task.id}>
                  <Card>
                    <CardContent>
                      <ListItemText primary={task.title} />
                      <Button onClick={() => markAsComplete(task.id)}>Complete</Button>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Pending Tasks</Typography>
            <List>
              {tasks.pending.map(task => (
                <ListItem key={task.id}>
                  <Card>
                    <CardContent>
                      <ListItemText primary={task.title} />
                      <Button onClick={() => markAsComplete(task.id)}>Complete</Button>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Completed Tasks</Typography>
            <List>
              {tasks.completed.map(task => (
                <ListItem key={task.id}>
                  <Card>
                    <CardContent>
                      <ListItemText primary={task.title} />
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button onClick={() => addNewTask("new-category")}>Add New Task</Button>
        </Box>
      </Container>
    </>
  );
}
