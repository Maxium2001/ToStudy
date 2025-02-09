const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialeSchema = new Schema({
  nome: { type: String, required: true },
  dataCreazione: { type: Date, default: Date.now },
  autore: { type: Schema.Types.ObjectId, ref: "User", required: true },
  appunti: [{ type: Schema.Types.ObjectId, ref: "Appunti", default: [] }],
  gruppo: { type: Schema.Types.ObjectId, ref: "Gruppo", required: true },
});

const Materia = mongoose.model("Materia", MaterialeSchema);

module.exports = Materia;
