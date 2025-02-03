const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./api/Users");
const Otp = require("./api/Otp"); // Ensure Otp model is correctly defined and imported

const app = express();
app.use(cors()); // Aggiungi questa riga per abilitare CORS
app.use(express.json());

require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;
// Connessione a MongoDB
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Endpoint di registrazione
app.post("/register", async (req, res) => {
  try {
    const { nome, cognome, email, username, password } = req.body;

    // Controlla se l'utente esiste già
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Utenza già esistente" });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuovo utente
    const newUser = new User({
      nome,
      cognome,
      email,
      username,
      password: hashedPassword,
    });

    // Salva l'utente nel database
    await newUser.save();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trova l'utente per username
    let user = await User.findOne({ username: email });
    if (!user) {
      user = await User.findOne({ email });
    }
    if (!user) {
      return res.status(400).json({ message: "Utente non trovato" });
    }

    // Confronta la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password sbagliata" });
    }
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
});

app.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;

    // Trova l'utente per email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: email + " non trovato" });
    }

    // Genera un token di reset password (puoi usare una libreria come crypto per generare un token)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newOtp = new Otp({
      email,
      otp: resetToken,
    });

    // Salva il token nel database
    await newOtp.save();
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
});

app.post("/confermaotp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Trova il token di reset password
    const otpDoc = await Otp.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ message: "Codice di sicurezza invalido" });
    }
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
});

// Avvio del server
app.listen(3000, () => console.log("Server started on port 3000"));
