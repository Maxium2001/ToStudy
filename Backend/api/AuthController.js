require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("./Users");
const Otp = require("./Otp");
const nodemailer = require("nodemailer");

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// Configura il trasportatore di Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

const register = async (req, res) => {
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
    res
      .status(201)
      .json({ message: "Registrazione riuscita", userId: newUser._id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

const login = async (req, res) => {
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
    res.status(200).json({ message: "Accesso riuscito", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
};

const generateOtp = async (req, res) => {
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
};

const confirmOtp = async (req, res) => {
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
};

const passwordResetWithOtp = async (req, res) => {
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
};

const resetPassword = async (req, res) => {
  try {
    const { id, password, newPassword } = req.body;
    console.log(id, password, newPassword);
    const user = await User.findById(id);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log("Password errata");
      return res.status(400).json({ message: "Password sbagliata" });
    }

    // Hash della nuova password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword);
    // Aggiorna la password dell'utente
    await user.updateOne({ password: hashedPassword });
    console.log("Password aggiornata con successo");

    res.status(200).json({ message: "Password aggiornata con successo" });
  } catch (error) {
    res.status(500).json({ message: "Errore del server" });
  }
};

module.exports = {
  register,
  login,
  generateOtp,
  confirmOtp,
  passwordResetWithOtp,
  resetPassword,
};
