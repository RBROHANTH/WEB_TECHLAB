const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // For serving static files like images and CSS

// Simple in-memory user database (in a real app, you'd use a proper database)
const users = [
    { username: 'Rohanth R B', password: '030706' },
    { username: 'admin', password: 'admin123' },
    { username: 'farmer', password: 'farm123' }
];

// GET method - Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// GET method - Serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// GET method - Alias for home.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// POST method - Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username and password are provided
    if (!username || !password) {
        return res.redirect('/login?error=Please enter both username and password');
    }
    
    // Find user in our simple database
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Successful login - redirect to home page with username
        return res.redirect('/home?success=true&username=' + encodeURIComponent(username));
    } else {
        // Failed login
        return res.redirect('/login?error=Invalid username or password');
    }
});

// GET method - Serve the registration page (placeholder)
app.get('/register', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Registration Page</title>
                <meta http-equiv="refresh" content="5;url=/login">
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
                </style>
            </head>
            <body>
                <h1>Registration Page</h1>
                <p>This is a placeholder for the registration page.</p>
                <p>You will be redirected to the login page in 5 seconds...</p>
            </body>
        </html>
    `);
});

// Define routes for other pages to handle potential 404 errors
app.get('/cow', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cow.html'));
});

app.get('/goat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'goat.html'));
});

app.get('/poultry', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'poultry.html'));
});

app.get('/Shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Shop.html'));
});

app.get('/feedCALCULATOR', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedCALCULATOR.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});