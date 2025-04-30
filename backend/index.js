//import express
const express = require("express");
const app = express();
const cors = require("cors");

//import dotenv for secrets
require("dotenv").config();

//import mongoose and connect for mongodb use
const mongoose = require("mongoose");

//to be able to allow cors
app.use(cors());

//import different routes
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/oAuth");
const geminiRoutes = require('./routes/geminiFetch')

//request object as a json object
app.use(express.json());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);
app.use("/connect", geminiRoutes);

const host  = '0.0.0.0';

async function ServerStart() {
  await mongoose.connect(process.env.MONGODB);
  app.listen(process.env.PORT, host);
  console.log("Server started");
}

ServerStart();
