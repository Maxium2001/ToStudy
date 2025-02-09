const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authController = require("./api/AuthController");
const groupController = require("./api/GroupController");
const userController = require("./api/UserController");
const MateriaController = require("./api/MateriaController");

const app = express();
app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;
console.log("Starting server...");

// Connessione a MongoDB
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Esci dal processo se non riesci a connetterti al database
  });

app.post("/register", (req, res) => {
  console.log("Register endpoint hit");
  authController.register(req, res);
});

app.post("/login", (req, res) => {
  console.log("Login endpoint hit");
  authController.login(req, res);
});

app.post("/generaotp", (req, res) => {
  console.log("Generate OTP endpoint hit");
  authController.generateOtp(req, res);
});

app.post("/confermaotp", (req, res) => {
  console.log("Confirm OTP endpoint hit");
  authController.confirmOtp(req, res);
});

app.post("/passwordreset", (req, res) => {
  console.log("Password reset endpoint hit");
  authController.passwordReset(req, res);
});

app.get("/getusergroups", userController.getUserGroups);

app.post("/creamateria", MateriaController.creaMateria);

app.get("/getmateria", MateriaController.getMateriaById);

app.post("/addusergroup", userController.addUserGroup);

app.get("/getgroupmaterie", groupController.getGroupMaterie);

app.post(
  "/creaappunti",
  userController.upload.single("file"),
  userController.creaAppunti
);

app.get("/getappuntibyid", userController.getAppuntiById);

app.get("/getusernamebyid", userController.getUsernameById);

app.get("/getappunti", userController.getAppunti);

app.post("/creagroup", groupController.creaGroupo);

app.get("/getgroup", groupController.getGroupById);

// Avvio del server
app.listen(3000, () => console.log("Server started on port 3000"));
