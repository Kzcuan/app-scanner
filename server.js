const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API routes
app.use('/api', apiRoutes);

// Serve scanner.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'scanner.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 