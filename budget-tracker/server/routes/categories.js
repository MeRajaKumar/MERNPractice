const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Category = require('../models/Category');


// GET /api/categories
router.get('/', auth, async (req, res) => {
try {
const categories = await Category.find({ $or: [{ user: null }, { user: req.user._id }] }).sort('name');
res.json(categories);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// POST /api/categories
router.post(
'/',
auth,
[body('name').notEmpty().withMessage('Name required')],
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { name } = req.body;
// Prevent duplicate for the user
const exists = await Category.findOne({ name: name.trim(), user: req.user._id });
if (exists) return res.status(400).json({ message: 'Category already exists' });


const cat = new Category({ name: name.trim(), user: req.user._id });
await cat.save();
res.json(cat);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
}
);


module.exports = router;