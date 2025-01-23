const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./api/Users'); // Assicurati di importare il modello User

const app = express();
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Endpoint di registrazione
app.post('/register', async (req, res) => {
    try {
        const { nome, cognome, email, username, password } = req.body;

        // Controlla se l'utente esiste già
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Avvio del server
app.listen(3000, () => console.log('Server started on port 3000'));