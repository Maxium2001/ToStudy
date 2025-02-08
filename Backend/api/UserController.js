const User = require("./Users");

const getUserGroups = async (req, res) => {
  try {
    const { id } = req.params; // Usa req.query per ottenere i parametri di query
    const user = await User.findById(id).populate({
      path: "gruppi",
      model: "Group",
    });
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.status(200).json(user.gruppi);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID utente non valido" });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ message: "Errore di validazione" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { getUserGroups };
