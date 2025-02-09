const Group = require("./Groups");
const User = require("./Users");
const Materia = require("./Materia");
const { get } = require("http");

const creaGroupo = async (req, res) => {
  try {
    const { nome, descrizione, utente, materie } = req.body;

    const utenti = [utente];

    const newGroup = new Group({
      nome,
      descrizione,
      utenti,
      materie,
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

const getGroupMaterie = async (req, res) => {
  try {
    const { id } = req.body;
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Gruppo non trovato" });
    }

    const materie = await Promise.all(
      group.materie.map(async (materiaId) => {
        const materia = await Materia.findById(materiaId);
        return materia;
      })
    );
    res.status(200).json(materie);
  } catch (error) {
    console.error("Errore nel recupero delle materie del gruppo:", error);
    res.status(500).json({ message: error.message });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { id } = req.body;
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

module.exports = { creaGroupo, getGroupById, getGroupMaterie };
