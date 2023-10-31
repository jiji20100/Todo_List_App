import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Grid,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  // Déclaration des états locaux pour stocker la liste des tâches et le titre d'une nouvelle tâche
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    // Utilisation de useEffect pour charger la liste des tâches depuis le backend
    axios.get('http://localhost:3001/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleAddTask = () => {
    // Envoyer une nouvelle tâche au backend
    axios.post('http://localhost:3001/tasks', { title: newTaskTitle }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    });
  };

  const handleToggleComplete = (taskId) => {
    // Mettre à jour l'état de la tâche au backend (complétée ou non)
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
        axios.put(`http://localhost:3001/tasks/${taskId}`, { completed: task.completed });
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    // Supprimer une tâche du backend
    axios.delete(`http://localhost:3001/tasks/${taskId}`).then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo List</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={2}>
          <TextField
            variant="outlined"
            fullWidth
            type="text"
            label="Nouvelle tâche"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Ajouter
          </Button>
        </Box>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <ListItemText
                primary={task.title}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
