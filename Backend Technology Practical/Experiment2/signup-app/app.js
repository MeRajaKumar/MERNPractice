// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Define the path to the users.json file for storing signup data
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Middleware to parse incoming form data (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle signup form submissions (POST request to /signup)
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Read the existing users from users.json
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let users = [];
        try {
            // Parse the existing JSON data into an array
            users = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing users file:', parseErr);
            return res.status(500).send('Internal Server Error');
        }

        // Create a new user object
        const newUser = {
            id: Date.now(),  // Unique ID based on current timestamp
            name,
            email,
            password
        };

        // Add the new user to the existing users array
        users.push(newUser);

        // Save the updated users array back to users.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to users file:', writeErr);
                return res.status(500).send('Internal Server Error');
            }

            // Send a success response to the client
            res.send('Signup successful!');
        });
    });
});

// Start the server and listen on specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
