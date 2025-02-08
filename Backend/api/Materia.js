const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialeSchema = new Schema({
  nome: { type: String, required: true },
  autore: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  dataCreazione: { type: Date, default: Date.now },
  commento: { type: String },
  appunti: [{ type: Schema.Types.ObjectId, ref: "Appunti", default: [] }],
});

const Materia = mongoose.model("Materia", MaterialeSchema);

module.exports = Materia;
