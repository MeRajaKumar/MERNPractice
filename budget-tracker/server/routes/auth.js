const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');


// POST /api/auth/register
router.post(
'/register',
[
body('name').notEmpty().withMessage('Name required'),
body('email').isEmail().withMessage('Valid email required'),
body('password').isLength({ min: 6 }).withMessage('Password 6+ chars'),
body('budget').optional().isNumeric()
],
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { name, email, password, budget } = req.body;
try {
let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'User already exists' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


user = new User({ name, email, password: hashed, budget: budget || 0 });
await user.save();


const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });


res.json({ token, user: { id: user._id, name: user.name, email: user.email, budget: user.budget } });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
}
);


// POST /api/auth/login
router.post(
'/login',
[body('email').isEmail(), body('password').exists()],
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });


res.json({ token, user: { id: user._id, name: user.name, email: user.email, budget: user.budget } });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
}
);


// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
res.json({ user: req.user });
});


module.exports = router;