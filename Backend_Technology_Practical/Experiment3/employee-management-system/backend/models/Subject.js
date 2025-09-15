const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subjectId: { type: String, required: true, unique: true },
  subjectName: { type: String, required: true },
  expInTeaching: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
