const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-Routes');
const serverCommands = require('./routes/server-Commands');

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beammp')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Route for the root path
app.get('/', (req, res) => {
  res.send('BeamMP Server Management Backend is running!');
});

// Route for the auth routes
app.use('/api', authRoutes); // Use the auth routes

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Routes for server commands
app.post('/api/start', serverCommands.startServer);
app.post('/api/stop', serverCommands.stopServer);

