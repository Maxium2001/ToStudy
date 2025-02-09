const Materia = require("./Materia");
const Group = require("./Groups");
const creaMateria = async (req, res) => {
  try {
    const { nome, autore, commento, gruppo } = req.body;
    const newMateria = new Materia({
      nome,
      autore,
      commento,
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
    const { id } = req.params;
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

module.exports = { creaMateria, getMateriaById };
