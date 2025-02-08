const Group = require("./Groups");
const User = require("./Users");

const creaGroupo = async (req, res) => {
  try {
    const { nome, descrizione, utente, materiale } = req.body;

    const utenti = [utente];

    const newGroup = new Group({
      nome,
      descrizione,
      utenti,
      materiale,
    });

    await newGroup.save();

    await User.findOneAndUpdate(
      { email: utente },
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
