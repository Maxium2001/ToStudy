const mongoose = require("mongoose");
const Group = require("./Groups");
const User = require("./Users");

const creaGroupo = async (req, res) => {
  try {
    console.log("Richiesta ricevuta per creazione gruppo:", req.body);

    const { nome, descrizione, _id } = req.body;

    // Trova l'utente per _id
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Utente non trovato.");
    }

    // Converti il valore di 'user._id' in ObjectId

    const newGroup = new Group({
      nome: nome,
      descrizione: descrizione,
      utenti: _id,
    });

    await newGroup.save();

    console.log("Gruppo creato con successo:", newGroup);

    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { gruppi: newGroup._id } },
      { new: true }
    );

    res.status(201).json({ message: "Gruppo creato con successo" });
  } catch (error) {
    console.error("Errore nel salvataggio del gruppo:", error);
    res.status(500).json({
      message: "Errore nel salvataggio del gruppo",
      error: error.message,
    });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params; // Usa req.params per ottenere l'ID del gruppo
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Gruppo non trovato" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Errore nel recupero del gruppo:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { creaGroupo, getGroupById };
