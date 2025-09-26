const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = './users.json';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Function to get users from JSON file
function getUsers() {
  try {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Function to save users to JSON file
function saveUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

app.get('/', (req, res) => {
  const users = getUsers();
  res.render('index', { users });
});

app.post('/add-user', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    const users = getUsers();
    users.push({ name, email });
    saveUsers(users);
  }
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
