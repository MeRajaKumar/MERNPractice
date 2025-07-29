const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    category: String,
    amount: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
