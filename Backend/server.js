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
// Connessione a MongoDB
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/register", authController.register);

app.post("/login", authController.login);

app.post("/generaotp", authController.generateOtp);

app.post("/confermaotp", authController.confirmOtp);

app.post("/passwordreset", authController.passwordReset);

app.get("/getusergroups", userController.getUserGroups);

// Creazione di un gruppo
app.post("/creategroup", groupController.createGroup);

// Ottenere un gruppo per ID (modifica il percorso per usare i parametri URL)
app.get("/getgroup/:id", groupController.getGroupById);
app.post('/materie', MateriaController.createMateria);  // Crea una nuova materia
app.get('/materie', MateriaController.getMaterie);      // Ottieni tutte le materie

// Avvio del server
const port = process.env.PORT || 3001; // Cambia la porta qui
app.listen(port, () => console.log(`Server started on port ${port}`));