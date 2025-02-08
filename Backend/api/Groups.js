const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descrizione: { type: String, required: true },
  utenti: { type: Array, default: [] },
  materiale: { type: Array, default: [] },
  thumbnail: { type: String, default: "" },
  dataCreazione: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", GroupSchema);

