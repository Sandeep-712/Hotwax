const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '123456789', // Your MySQL password
    database: 'crud_db', // Database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Get all items
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add an item
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, name, description });
    });
});

// Update an item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Item updated successfully' });
    });
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Item deleted successfully' });
    });
});


// Routes
app.get('/', (req, res) => res.send('API is working!'));

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
