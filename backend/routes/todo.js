//import express
const express = require("express");

//get router from express
const router = express.Router();

//import mongoose  for mongodb use
const mongoose = require("mongoose");

//import db schema
const { todo, user } = require("../database/schemadb");

//import auth middleware
const { authMiddleware } = require("../middleware/authenticate");

//jsonwebtoken for authentication
const jwt = require("jsonwebtoken");

//route for adding todo
router.post("/add", authMiddleware, async (req, res) => {
  const userTodo = req.body;

  console.log(userTodo);

  try {
    await todo.create({
      userId: req.headers.userId,
      title: userTodo.title,
      description: userTodo.description,
      subtasks: userTodo.subtasks,
      category: userTodo.category,
      priority: userTodo.priority,
      completed: userTodo.completed,
      creationDate: userTodo.creationDate,
      endDate: userTodo.endDate,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while creating todo",
    });
  }

  try {
    const addedTodo = await todo.findOne({
      title: userTodo.title,
      creationDate: userTodo.creationDate,
    });

    res.json({
      message: "Successfull",
      todoId: addedTodo._id,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
    });
  }
});

//router for updating todo
router.put("/update", authMiddleware, async (req, res) => {
  const userTodo = req.body;
  const todoId = req.headers.todoid;

  try {
    await todo.findByIdAndUpdate(todoId, {
      title: userTodo?.title,
      priority: userTodo?.priority,
      description: userTodo?.description,
      subtasks: userTodo?.subtasks,
      category: userTodo.category,
      completed: userTodo?.completed,
      creationDate: userTodo?.creationDate,
      endDate: userTodo?.endDate,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "uncaught error",
    });
  }

  res.json({
    message: "todoUpdated",
  });
});

//router for deleting todo
router.delete("/delete", authMiddleware, async (req, res) => {
  const todoId = req.headers.todoid;

  try {
    if (todo.findById(todoId)) {
      await todo.findByIdAndDelete(todoId);
    } else {
      return res.json({
        message: "No todo found with this id!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Unable to delete",
    });
  }

  res.json({
    message: "todoDeleted",
  });
});

//router for fetching all todo
router.get("/todolist", authMiddleware, async (req, res) => {
  const userId = req.headers.userId;
  console.log(userId)
  
  try {
    if (
      await user.findOne({
        _id: userId,
      })
    ) {
      try {
        const todoArray = await todo.find({
          userId: userId,
        });
        
        console.log(todoArray)
        return res.json({
          message: "todoList fetched",
          todoList: todoArray,
        });
      } catch (error) {
        console.log(error);
        return res.json({
          message: "No todos found for the user",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Somehting went wrong",
    });
  }
});

module.exports = router;
