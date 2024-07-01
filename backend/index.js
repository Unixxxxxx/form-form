const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/ne')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Schema and Model
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Form = mongoose.model('Form', formSchema);

// Routes
app.post('/api/form', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting form', error });
    }
});
// GET route to retrieve form data
app.get('/api/forms', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving forms', error });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the form API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
