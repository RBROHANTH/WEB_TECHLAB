const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 
const users = [
    { username: 'Rohanth R B', password: '030706' },
    { username: 'admin', password: 'admin123' },
    { username: 'farmer', password: 'farm123' }
];
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.redirect('/login?error=Please enter both username and password');
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.redirect('/home?success=true&username=' + encodeURIComponent(username));
    } else {
        return res.redirect('/login?error=Invalid username or password');
    }
});
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
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});