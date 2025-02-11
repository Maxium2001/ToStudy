const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gruppi: [{ type: Schema.Types.ObjectId, ref: "Gruppo", required: true }],
  istruzione: { type: String },
  sesso: { type: String },
  eta: { type: Number },
  icon: {
    type: Schema.Types.ObjectId,
    ref: "Icona",
    default: "67ab50dea47c266ca5180fc5",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
