const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const toml = require('toml');
const tomlStringify = require('@iarna/toml/stringify');


// Path to the config file
const configFilePath = path.join(__dirname, '../../../test/test-config.toml');

// Route to get the current configuration
router.get('/', (req, res) => {
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading config file:', err);
            return res.status(500).send({ message: 'Error reading config file' });
        }
        try {
            const configData = toml.parse(data);
            res.send(configData);
        } catch (parseErr) {
            console.error('Error parsing toml data:', err);
            return res.status(500).send({ message: 'Error parsing toml data' });
        };
    });
});

// Route to update the configuration
router.post('/', (req, res) => {
    const newConfig = req.body
    const tomlConfig = tomlStringify(newConfig);
    
    fs.writeFile(configFilePath, tomlConfig, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the config file:', err);
            return res.status(500).send({ message: 'Error writing the config file.' });
        }
        res.send({ message: 'Config updated successfully.' });
    });
});

module.exports = router;