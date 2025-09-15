const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  eId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
