const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authController = require("./api/AuthController");
const groupController = require("./api/GroupController");
const userController = require("./api/UserController");

const app = express();
app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;
// Connessione a MongoDB
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/register", authController.register);

app.post("/login", authController.login);

app.post("/generaotp", authController.generateOtp);

app.post("/confermaotp", authController.confirmOtp);

app.post("/passwordreset", authController.passwordReset);

app.get("/getusergroups", userController.getUserGroups);

app.post("/creategroup", groupController.createGroup);

app.get("/getgroup", groupController.getGroupById);

// Avvio del server
app.listen(3000, () => console.log("Server started on port 3000"));
