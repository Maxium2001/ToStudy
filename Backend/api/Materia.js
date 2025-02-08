const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
});

const Materia = mongoose.model('Materia', MateriaSchema);

module.exports = Materia;