const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialeSchema = new Schema({
  nome: { type: String, required: true },
  dataCreazione: { type: Date, default: Date.now },
  appunti: [{ type: Schema.Types.ObjectId, ref: "Appunti", default: [] }],
});

const Materia = mongoose.model("Materia", MaterialeSchema);

module.exports = Materia;
