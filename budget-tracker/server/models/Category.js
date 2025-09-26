const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
name: { type: String, required: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Category', CategorySchema);