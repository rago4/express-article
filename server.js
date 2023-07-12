const express = require("express");

const port = 8080;
const app = express();
app.use(express.json());

const todos = [
  { id: 1, title: "Go grocery shopping 🛒", completed: true },
  { id: 2, title: "Do the laundry 🧺", completed: false },
];

/**
 * GET - /api/todos
 */
app.get("/api/todos", (req, res) => {
  res.status(200).json(todos);
});

/**
 * POST - /api/todos
 */
app.post("/api/todos", (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const title = String(req.body.title).trim();
  if (title.length < 3) {
    res.status(400).json({ message: "Title must be at least 3 characters" });
    return;
  }

  const newItem = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newItem);
  res.status(201).json(newItem);
});

/**
 * DELETE - /api/todos/:id
 */
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const itemIndex = todos.findIndex((todo) => todo.id === id);
  if (itemIndex === -1) {
    res.status(404).json({ message: `Item with id ${id} not found.` });
    return;
  }

  const removedItem = { ...todos[itemIndex] };

  todos.splice(itemIndex, 1);
  res.status(200).json(removedItem);
});

app.listen(port, () => {
  console.log(`[server]: listening on port ${port}`);
});
