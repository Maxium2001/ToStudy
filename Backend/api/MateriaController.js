const Materia = require("./Materia"); // Assicurati di avere un modello Materia

const createMateria = async (req, res) => {
  try {
    const { nome } = req.body;
    const newMateria = new Materia({ nome });
    const savedMateria = await newMateria.save();
    res.status(201).json(savedMateria);
  } catch (error) {
    console.error("Errore nel salvataggio della materia:", error);
    res.status(500).send("Errore nel salvataggio della materia");
  }
};

const getMaterie = async (req, res) => {
  try {
    const materie = await Materia.find();
    res.status(200).json(materie);
  } catch (error) {
    console.error("Errore nel recupero delle materie:", error);
    res.status(500).send("Errore nel recupero delle materie");
  }
};

module.exports = { createMateria, getMaterie };