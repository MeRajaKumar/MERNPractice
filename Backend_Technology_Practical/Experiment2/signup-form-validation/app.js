const express = require('express'); 
const bodyParser = require('body-parser'); 
const fs = require('fs'); 
const path = require('path'); 
const { body, validationResult } = require('express-validator'); // Import express-validator 
 
const app = express(); 
const PORT = 3000; 
const usersFilePath = path.join(__dirname, 'data', 'users.json'); 
 
// Ensure users.json exists and is valid 
if (!fs.existsSync(usersFilePath)) { 
  fs.mkdirSync(path.dirname(usersFilePath), { recursive: true }); 
  fs.writeFileSync(usersFilePath, '[]', 'utf8'); 
} 
 
// Middleware to parse form data 
 
 
app.use(bodyParser.urlencoded({ extended: true })); 
 
// Serve static files from "public" 
app.use(express.static(path.join(__dirname, 'public'))); 
 
// Redirect "/" to "/signup" 
app.get('/', (req, res) => { 
  res.redirect('/signup'); 
}); 
 
// Serve signup form 
app.get('/signup', (req, res) => { 
  res.sendFile(path.join(__dirname, 'public', 'signup.html')); 
}); 
 
// Handle signup form submission with validations 
app.post( 
  '/signup', 
  [ 
    body('name').isLength({ min: 1 }).withMessage('Name is required'), 
    body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(), 
    body('password') 
      .isLength({ min: 6 }) 
      .withMessage('Password must be at least 6 characters long') 
  ], 
  (req, res) => { 
    // Handle validation errors 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() }); 
    } 
 
    const { name, email, password } = req.body; 
 
    fs.readFile(usersFilePath, 'utf8', (err, data) => { 
      if (err) { 
        console.error('Error reading users file:', err); 
        return res.status(500).send('Internal Server Error'); 
      } 
 
      let users = []; 
      try { 
        users = data.trim() ? JSON.parse(data) : []; 
      } catch (parseErr) { 
        console.error('Error parsing users file, resetting file...'); 
        users = []; 
      } 
 
 
 
      //  Check for duplicate email 
      const emailExists = users.some(user => user.email === email); 
      if (emailExists) { 
        return res.status(400).json({ errors: [{ msg: 'Email is already registered' }] }); 
      } 
 
      const newUser = { id: Date.now(), name, email, password }; 
      users.push(newUser); 
 
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => { 
        if (writeErr) { 
          console.error('Error writing to users file:', writeErr); 
          return res.status(500).send('Internal Server Error'); 
        } 
 
        // Show an HTML success page 
        res.send(` 
          <html> 
            <head> 
              <title>Signup Successful</title> 
              <style> 
                body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; } 
                h1 { color: green; } 
                a { text-decoration: none; color: blue; } 
              </style> 
            </head> 
            <body> 
              <h1>Signup successful!</h1> 
              <p>Welcome, ${name}!</p> 
              <a href="/signup">Go back to Signup</a> 
            </body> 
          </html> 
        `); 
      }); 
    }); 
  } 
); 
 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
}); 