const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppuntiSchema = new Schema({
  titolo: { type: String, required: true },
  autore: { type: Schema.Types.ObjectId, ref: "User", required: true },
  commento: { type: String },
  file: { type: Buffer, required: true },
  fileType: { type: String, required: true },
  dataCreazione: { type: Date, default: Date.now },
  fileHash: { type: String, required: true, unique: true },
  materia: {
    type: Schema.Types.ObjectId,
    ref: "Materia",
    required: true,
  },
});

const Appunti = mongoose.model("Appunti", AppuntiSchema);

module.exports = Appunti;
