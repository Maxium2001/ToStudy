const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descrizione: { type: String, required: true },
  utenti: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  materie: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Material", default: [] },
  ],
  dataCreazione: { type: Date, default: Date.now },
  thumbnail: {
    type: String,
    default: "https://picfiles.alphacoders.com/311/311202.jpg",
  },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
