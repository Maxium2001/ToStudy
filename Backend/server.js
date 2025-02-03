const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./api/Users");
const Otp = require("./api/Otp"); // Ensure Otp model is correctly defined and imported
const nodemailer = require("nodemailer");

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

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// Configura il trasportatore di Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Puoi usare altri servizi come Yahoo, Outlook, etc.
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD, // Sostituisci con la tua password
  },
});

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
    res.status(201).json({ message: "Utente creato con successo" });
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
    res.status(200).json({ message: "Accesso riuscito" });
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
});

app.post("/generaotp", async (req, res) => {
  try {
    const { email } = req.body;

    // Trova l'utente per email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: email + " non trovato" });
    }

    const existingOtp = await Otp.findOne({ email });
    if (existingOtp) {
      await Otp.deleteOne({ email });
    }
    // Genera un token di reset password (puoi usare una libreria come crypto per generare un token)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newOtp = new Otp({
      email,
      otp: resetToken,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Scade in 10 minuti
    });

    // Configura l'email
    const mailOptions = {
      from: EMAIL, // Sostituisci con la tua email
      to: email,
      subject: "Codice di sicurezza",
      text: `Il tuo codice di sicurezza è: ${resetToken}`,
    };

    // Invia l'email
    try {
      await transporter.sendMail(mailOptions);
      // Salva il token nel database
      await newOtp.save();
      return res.status(200).json({ message: "Codice di sicurezza inviato" });
    } catch (error) {
      return res.status(500).json({ message: "Errore nell'invio dell'email" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Codice di sicurezza gia mandato, aspettare un attimo",
    });
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
    res.status(200).json({ message: "Codice di sicurezza valido" });
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
});

app.post("/passwordreset", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Trova il token di reset password
    const otpDoc = await Otp.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ message: "Codice di sicurezza invalido" });
    }

    // Hash della nuova password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Aggiorna la password dell'utente
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Rimuovi il token OTP dal database
    await Otp.deleteOne({ email, otp });

    res.status(200).json({ message: "Password aggiornata con successo" });
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
});

// Avvio del server
app.listen(3000, () => console.log("Server started on port 3000"));
