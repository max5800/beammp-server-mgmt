const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the config file
const configFilePath = path.join(__dirname, '../../test/test-config.json');

// Route to get the current configuration
router.get('/', (req, res) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            return res.status(500).send({ message: 'Error reading config file' });
        }
            res.send(data);
        });
    });

// Route to update the configuration
router.post('/', (req, res) => {
    const newConfig = req.body.config; 
    if (typeof newConfig !== 'string' || newConfig.trim() === '') {
        return res.status(400).send({ message: 'Invalid config data provided.' });
    }

    fs.writeFile(configFilePath, newConfig, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the config file:', err);
            return res.status(500).send({ message: 'Error writing the config file.' });
        }
        res.send({ message: 'Config updated successfully.' });
    });
});

module.exports = router;