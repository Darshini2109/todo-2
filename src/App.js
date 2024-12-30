import React, { useState } from "react";
import {Button,TextField,Typography,Grid,Paper,IconButton,Box,Checkbox,Avatar,} from "@mui/material";
import {Delete,ChatBubbleOutline,CheckCircleOutline,} from "@mui/icons-material";
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Attach file icon
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Visibility off icon
import "./App.css";

const initialTasks = [
  {
    day: "Monday 29",
    items: [{ title: "Meeting with Sales team", category: "Sales" }],
  },
  {
    day: "Tuesday 30",
    items: [
      { title: "Launch paid ads campaign", category: "Product launch campaign" },
      { title: "Plan new sales strategy for Q3", category: "Sales" },
    ],
  },
  {
    day: "Wednesday 31",
    items: [
      { title: "Redesign footer layout", category: "Website redesign" },
      { title: "Write homepage copy", category: "Marketing" },
      { title: "Help - How to create a list", category: "Customer Support" },
    ],
  },
  {
    day: "Thursday 01",
    items: [
      { title: "Redesign logo", category: "Marketing" },
      { title: "Redesign blog layout", category: "Website redesign" },
    ],
  },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ title: "", category: "" });
  const [editingDayIndex, setEditingDayIndex] = useState(null);

  const handleAddTask = (dayIndex) => {
    setEditingDayIndex(dayIndex);
    setNewTask({ title: "", category: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSaveTask = () => {
    if (newTask.title && newTask.category) {
      const updatedTasks = tasks.map((day, index) =>
        index === editingDayIndex
          ? { ...day, items: [...day.items, newTask] }
          : day
      );
      setTasks(updatedTasks);
      setEditingDayIndex(null);
    }
  };

  const handleDeleteTask = (dayIndex, taskIndex) => {
    const updatedTasks = tasks.map((day, index) =>
      index === dayIndex
        ? { ...day, items: day.items.filter((_, idx) => idx !== taskIndex) }
        : day
    );
    setTasks(updatedTasks);
  };

  return (
    <Box className="task-board-container">
      {/* Date Display and complete Tasks box */}
      <Box className="date-display-board">
        <Box className="date-header">
          <Button variant="outlined">{"<"}</Button>
          <Typography variant="h7">29 Mar - 04 Apr, 2021</Typography>
          <Button variant="outlined">Today</Button>
        </Box>
        <Box className="incomplete-tasks">
          <VisibilityOffIcon color="action" />
          <Typography variant="body2">complete Tasks</Typography>
        </Box>
      </Box>

      {/* Task Cards Grid type */}
      <Grid container spacing={4}>
        {tasks.map((dayTasks, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Paper className="task-paper">
              <Box className="day-header">
                <Typography variant="h7">{dayTasks.day}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddTask(index)}
                >
                  Add Task
                </Button>
              </Box>

              {index === editingDayIndex && (
                <Box className="task-input-container">
                  <TextField
                    label="Task Title"
                    variant="outlined"
                    fullWidth
                    value={newTask.title}
                    name="title"
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Task Category"
                    variant="outlined"
                    fullWidth
                    value={newTask.category}
                    name="category"
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSaveTask}
                    fullWidth
                  >
                    Save Task
                  </Button>
                </Box>
              )}

              {dayTasks.items.map((task, idx) => (
                <Box className="task-card" key={idx}>
                  <Box className="category-indicator">
                    <Box className="red-dot" />
                    <Typography variant="body2" color="textSecondary">
                      {task.category}
                    </Typography>
                  </Box>
                  <Box className="task-content">
                    <Checkbox />
                    <Typography variant="body1" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteTask(index, idx)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  <Box className="task-footer">
                    <Box className="task-icons">
                      <ChatBubbleOutline fontSize="smaller" />
                      <Typography variant="body2">2</Typography>
                      <CheckCircleOutline fontSize="smaller" />
                      <Typography variant="body2">2/7</Typography>
                      
                    </Box>
                    <Box className="message-footer">
                      
                      <IconButton color="textsecondary">
                      <AttachFileIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskBoard;
