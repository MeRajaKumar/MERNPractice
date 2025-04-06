const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// Add Expense
router.post("/add", async (req, res) => {
    try {
        const { userId, category, amount } = req.body;
        const newExpense = new Expense({ userId, category, amount });
        await newExpense.save();
        res.json({ message: "Expense added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get Expenses
router.get("/:userId", async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.params.userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
