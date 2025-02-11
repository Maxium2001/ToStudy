const Group = require("./Groups");
const User = require("./Users");
const Materia = require("./Materia");

const creaGroupo = async (req, res) => {
  try {
    const { nome, descrizione, _id } = req.body;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Utente non trovato.");
    }

    const newGroup = new Group({
      nome: nome,
      descrizione: descrizione,
      utenti: _id,
    });

    await newGroup.save();

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

const rimouviGruppo = async (req, res) => {
  try {
    const { id } = req.body;
    const materie = await Group.findById(id);
    await Group.findByIdAndDelete(id);
    await User.updateMany({ gruppi: id }, { $pull: { gruppi: id } });
    await Materia.deleteMany({ _id: { $in: materie.materie } });
    res.status(200).json({ message: "Gruppo rimosso con successo" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

module.exports = { creaGroupo, getGroupById, rimouviGruppo };
