const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  Nome: { type: String, required: true, unique: true },
  Utenti: { type: Array, required: true },
  Materiale: { type: Array, required: true },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
