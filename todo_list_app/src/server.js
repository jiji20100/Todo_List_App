const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')// Importez le module cors
const port = 3001; // Port sur lequel le serveur écoutera
app.use(bodyParser.json());

const tasks = []; // Tableau pour stocker les tâches
// configuration du middleware cors
const corsOptions = {
    origin: 'http://localhost:3000',
}; 
app.use(cors(corsOptions));

// Route pour obtenir la liste de toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route pour créer une nouvelle tâche
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Route pour mettre à jour l'état d'une tâche
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tâche non trouvée' });
  }
});

// Route pour supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);
  // 
  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Tâche supprimée' });
  } else {
    res.status(404).json({ message: 'Tâche non trouvée' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
