const User = require("./Users");
const Group = require("./Groups");
const crypto = require("crypto");
const Icona = require("./Icona");

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

const uploadIcon = async (req, res) => {
  try {
    const { autore } = req.body;
    const icon = req.file;
    const fileHash = crypto
      .createHash("sha256")
      .update(icon.buffer)
      .digest("hex");

    const existingIcon = await Icona.findOne({ fileHash });
    const user = await User.findById(autore);
    if (existingIcon) {
      await User.findByIdAndUpdate(autore, {
        icon: existingIcon._id,
      });
      return res.status(200).json({ message: "Icona caricata con successo" });
    }
    const defaultIcon = "67aa6c3f3cec4db75761072e";
    if (user.icon !== defaultIcon) {
      await Icona.findByIdAndDelete(user.icon);
    }
    const newIcon = new Icona({
      autore: autore,
      file: icon.buffer,
      fileType: icon.mimetype,
      fileHash: fileHash,
    });
    await newIcon.save();
    user.updateOne({ icon: newIcon._id });
    res.status(200).json({ message: "Icona caricata con successo" });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "ID utente non valido" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getIcon = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const user = await User.findById(id);
    const icon = await Icona.findById(user.icon);
    res.set("Content-Type", icon.fileType);
    res.send(icon.file);
    console.log("send");
    res.status(200);
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
  getUserGroups,
  addUserGroup,
  aggiornaProfilo,
  uploadIcon,
  getIcon,
};
