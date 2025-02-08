const Materia = require("./Materia"); // Assicurati di avere un modello Materia

const creaMateria = async (req, res) => {
  try {
    const { nome, autore, commento } = req.body;
    const newMateria = new Materia({
      nome,
      autore,
      commento,
    });
    await newMateria.save();
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
