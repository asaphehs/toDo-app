const express = require('express');
const cors = require('cors'); // Adicione esta linha
const app = express();
const PORT = 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json());

// Dados temporários para armazenar as tarefas
let tasks = [];
let currentId = 1;

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
  const { content, category } = req.body; // Alterar 'status' para 'category'
  const newTask = {
    id: currentId++,
    content,
    category: category || 'To Do' // Por padrão, a nova tarefa começa como 'To Do'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa por ID
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { content, category } = req.body; // Alterar 'status' para 'category'
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  if (content) task.content = content;
  if (category) task.category = category; // Alterar 'status' para 'category'

  res.json(task);
});

// Rota para deletar uma tarefa por ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Servidor inicializado
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
