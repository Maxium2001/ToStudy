const Materia = require("./Materia");
const Group = require("./Groups");

const creaMateria = async (req, res) => {
  try {
    const { nome, autore, gruppo } = req.body;
    const newMateria = new Materia({
      nome,
      autore,
      gruppo,
    });
    await newMateria.save();
    await Group.findByIdAndUpdate(gruppo, {
      $push: { materie: newMateria._id },
    });
    res.status(201).json({ message: "Materia creata con successo" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

const getMateriaById = async (req, res) => {
  try {
    const { id } = req.query;
    const materia = await Materia.findById(id);
    if (!materia) {
      return res.status(404).json({ message: "Materia non trovata" });
    }
    res.status(200).json(materia);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

const rimuoviMateria = async (req, res) => {
  try {
    const { id } = req.body;
    const materia = Materia.findById(id);
    const appunti = materia.appunti;
    await Materia.findByIdAndDelete(id);
    await Materia.findByIdAndDelete(id);
    await Group.updateMany({ materie: id }, { $pull: { materie: id } });
    res.status(200).json({ message: "Materia rimossa con successo" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

module.exports = { creaMateria, getMateriaById, rimuoviMateria };
