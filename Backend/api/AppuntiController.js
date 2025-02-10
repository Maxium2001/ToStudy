const Appunti = require("./Appunti");
const Materia = require("./Materia");
const crypto = require("crypto");

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

module.exports = { creaAppunti, rimuoviAppunti, getAppunti, getAppuntiById };
