const User = require("./Users");
const Appunti = require("./Appunti");
const crypto = require("crypto");
const multer = require("multer");
const Materia = require("./Materia");
const Group = require("./Groups");

const upload = multer({ storage: multer.memoryStorage() });
const getUserGroups = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id).populate({
      path: "gruppi",
      model: "Group",
    });
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    const groups = await Promise.all(
      user.gruppi.map(async (groupId) => {
        const group = await Group.findById(groupId);
        return group;
      })
    );

    res.status(200).json(groups);
  } catch (error) {
    if (error.message === "Gruppo non trovato") {
      res.status(404).json({ message: "Gruppo non trovato" });
    } else if (error.name === "CastError") {
      res.status(400).json({ message: "ID utente non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const addUserGroup = async (req, res) => {
  try {
    const { id, groupId } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Gruppo non trovato" });
    }
    if (group.utenti.includes(id)) {
      return res
        .status(400)
        .json({ message: "Utente già presente nel gruppo" });
    }
    if (user.gruppi.includes(groupId)) {
      return res
        .status(400)
        .json({ message: "Utente già presente nel gruppo" });
    }
    await User.findByIdAndUpdate(id, { $push: { gruppi: groupId } });
    await Group.findByIdAndUpdate(groupId, { $push: { utenti: id } });
    res.status(200).json({ message: "Utente aggiunto al gruppo" });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID utente o gruppo non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const creaAppunti = async (req, res) => {
  try {
    const { titolo, materia, autore, commento } = req.body;
    const file = req.file;

    // Calcola l'hash del file
    const fileHash = crypto
      .createHash("sha256")
      .update(file.buffer)
      .digest("hex");

    // Controlla se esiste già un file con lo stesso hash
    const existingFile = await Appunti.findOne({ fileHash });
    if (existingFile) {
      await Materia.findByIdAndUpdate(materia, {
        $push: { appunti: existingFile._id },
      });
      return res.status(201).json({ message: "Appunto creato con successo" });
    }

    const newAppunti = new Appunti({
      titolo: titolo,
      autore: autore,
      commento: commento,
      file: file.buffer,
      fileType: file.mimetype,
      fileHash: fileHash,
      materia: materia,
    });

    await newAppunti.save();

    // Aggiungi il riferimento dell'appunto alla materia
    await Materia.findByIdAndUpdate(materia, {
      $push: { appunti: newAppunti._id },
    });

    res.status(201).json({ message: "Appunto creato con successo" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

const rimuoviAppunti = async (req, res) => {
  try {
    const { id } = req.body;
    await Appunti.findByIdAndDelete(id);
    await Materia.updateMany({ appunti: id }, { $pull: { appunti: id } });
    res.status(200).json({ message: "Appunti rimossi con successo" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore del server", error: error.message });
  }
};

const getAppunti = async (req, res) => {
  try {
    const { id } = req.query;
    const appunti = await Appunti.findById(id);
    if (!appunti) {
      return res.status(404).json({ message: "Appunti non trovati" });
    }
    res.set("Content-Type", appunti.fileType);
    res.send(appunti.file);
    res.status(200);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID appunti non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAppuntiById = async (req, res) => {
  try {
    const { id } = req.query;
    const appunti = await Appunti.findById(id)
      .select("titolo autore commento dataCreazione")
      .populate("autore", "username");
    if (!appunti) {
      return res.status(404).json({ message: "Appunti non trovati" });
    }
    res.status(200).json(appunti);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID appunti non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID utente non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const aggiornaProfilo = async (req, res) => {
  try {
    const { id, eta, sesso, istruzione } = req.body;
    const updateFields = {};

    if (eta !== undefined) updateFields.eta = eta;
    if (sesso !== undefined) updateFields.sesso = sesso;
    if (istruzione !== undefined) updateFields.istruzione = istruzione;

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.status(200).json({ message: "Profilo aggiornato con successo", user });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID utente non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getUserById,
  creaAppunti,
  getUserGroups,
  upload,
  addUserGroup,
  getAppunti,
  getAppuntiById,
  rimuoviAppunti,
  aggiornaProfilo,
};
