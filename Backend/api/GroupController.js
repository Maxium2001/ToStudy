const Group = require("./Groups");
const User = require("./Users");

const createGroup = async (req, res) => {
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
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
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
    res.status(500).json({ message: "Errore del server" });
  }
};

module.exports = { createGroup, getGroupById };
