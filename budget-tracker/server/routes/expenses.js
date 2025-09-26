const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
const User = require('../models/User');


// POST /api/expenses -> create expense
router.post(
'/',
auth,
[body('amount').isNumeric().withMessage('Amount required')],
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { amount, description, category, date } = req.body;
const exp = new Expense({
user: req.user._id,
amount,
description: description || '',
category: category || 'Misc',
date: date ? new Date(date) : new Date()
});
await exp.save();
res.json(exp);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
}
);


// GET /api/expenses -> list expenses for user with optional filters
router.get('/', auth, async (req, res) => {
try {
const { startDate, endDate, category } = req.query;
const q = { user: req.user._id };
if (category) q.category = category;
if (startDate || endDate) q.date = {};
if (startDate) q.date.$gte = new Date(startDate);
if (endDate) q.date.$lte = new Date(endDate);


const expenses = await Expense.find(q).sort({ date: -1 });
res.json(expenses);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// PUT /api/expenses/:id -> update
router.put('/:id', auth, async (req, res) => {
try {
const exp = await Expense.findById(req.params.id);
if (!exp) return res.status(404).json({ message: 'Expense not found' });
if (exp.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not allowed' });

const { amount, description, category, date } = req.body;
if (amount !== undefined) exp.amount = amount;
if (description !== undefined) exp.description = description;
if (category !== undefined) exp.category = category;
if (date !== undefined) exp.date = new Date(date);

await exp.save();
res.json(exp);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});