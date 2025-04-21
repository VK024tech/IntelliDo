//import express
const express = require("express");
const app = express();
const cors = require("cors");

//import dotenv for secrets
require("dotenv").config();

//import mongoose and connect for mongodb use
const mongoose = require("mongoose");

//to be able to allow cors
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    
  })
);

// app.options('*', cors());

//import different routes
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/oAuth");

//request object as a json object
app.use(express.json());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

async function ServerStart() {
  await mongoose.connect(process.env.MONGODB);
  app.listen(process.env.PORT);
  console.log("Server started");
}

ServerStart();
