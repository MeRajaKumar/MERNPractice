require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/employees', require('./routes/employeeRoutes'));
app.use('/subjects', require('./routes/subjectRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
