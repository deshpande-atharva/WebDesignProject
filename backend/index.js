const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
app.use(bodyParser.json());

const users = [];

// Signup route
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully!' });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, message: 'Login successful!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



