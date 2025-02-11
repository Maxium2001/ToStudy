const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IconaSchema = new Schema({
  autore: { type: Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: Buffer, required: true },
  fileType: { type: String, required: true },
  fileHash: { type: String, required: true, unique: true },
});

const Icona = mongoose.model("Icona", IconaSchema);

module.exports = Icona;
