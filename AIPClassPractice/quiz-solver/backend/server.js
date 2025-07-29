const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/quiz', quizRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/quizsolver', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
