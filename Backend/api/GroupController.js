const Group = require("./Groups");
const User = require("./Users");

const createGroup = async (req, res) => {
  try {
    console.log("Dati ricevuti dal frontend:", req.body);  // Debug

    const { nome, descrizione } = req.body;  // Ricevi i dati

    if (!nome || !descrizione) {
      return res.status(400).json({ message: "Nome e descrizione sono obbligatori" });
    }

    const newGroup = new Group({
      nome,
      descrizione,
      utenti: [],
      materiale: [],
      thumbnail: "",
      dataCreazione: new Date(),
    });

    const savedGroup = await newGroup.save();
    console.log("Gruppo salvato:", savedGroup);
    res.status(200).json(savedGroup);
    res.status(200).json({ message: "Gruppo creato con successo!" });

  } catch (error) {
    console.error("Errore nel salvataggio del gruppo:", error);
    res.status(500).json({ message: "Errore nel salvataggio del gruppo", error: error.message });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Gruppo non trovato" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("Errore nel recupero del gruppo:", error);
    res.status(500).json({ message: "Errore nel recupero del gruppo", error: error.message });
  }
};

module.exports = { createGroup, getGroupById };