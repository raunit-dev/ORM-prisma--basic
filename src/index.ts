import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.get("/users", async (req, res) => {
  try {
    const users = await client.user.findMany({
      select: { id: true, username: true, age: true, city: true }
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error " });
  }
})

app.get("/user/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await client.user.findUnique({
      where: { id },
      select: { id: true, username: true, age: true, city: true, todos: true }
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error " });
  }
})

app.post("/signup", async (req, res) => {
  try {
    const { username, password, age, city } = req.body;
    if (!username || !password || !age) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = await client.user.create({
      data: { username, password, age, city }
    });
    res.status(201).json({ message: "User created", user: { id: user.id, username: user.username } });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await client.user.findUnique({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/users/:id/todos", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Missing title or description" });
    }
    const todo = await client.todo.create({
      data: { title, description, done: false, userId }
    });
    res.status(201).json({ message: "Todo created", todo });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/users/:id/todos", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const todos = await client.todo.findMany({ where: { userId } });
    res.json({ todos });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/todos/:todoId", async (req, res) => {
  try {
    const todoId = Number(req.params.todoId);
    const { done } = req.body;
    const todo = await client.todo.update({
      where: { id: todoId },
      data: { done }
    });
    res.json({ message: "Todo updated", todo });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.delete("/todos/:todoId", async (req, res) => {
  try {
    const todoId = Number(req.params.todoId);
    await client.todo.delete({ where: { id: todoId } });
    res.json({ message: "Todo deleted" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});