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

app.get("/getusergroups", (req, res) => {
  console.log("Get user groups endpoint hit");
  userController.getUserGroups(req, res);
});

// Creazione di un gruppo
app.post("/creategroup", (req, res) => {
  console.log("Create group endpoint hit");
  groupController.createGroup(req, res);
});

// Ottenere un gruppo per ID (modifica il percorso per usare i parametri URL)
app.get("/getgroup/:id", (req, res) => {
  console.log("Get group by ID endpoint hit");
  groupController.getGroupById(req, res);
});

app.post('/materie', (req, res) => {
  console.log("Create materia endpoint hit");
  MateriaController.createMateria(req, res);
});  // Crea una nuova materia

app.get('/materie', (req, res) => {
  console.log("Get materie endpoint hit");
  MateriaController.getMaterie(req, res);
});      // Ottieni tutte le materie

// Avvio del server
const port = process.env.PORT || 3001; // Cambia la porta qui
app.listen(port, () => console.log(`Server started on port 3000`));