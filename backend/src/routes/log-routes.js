const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const LOG_FILE_PATH = path.join(__dirname, '../../../test/test-server.log');

router.get('/', (req, res) => {
  fs.readFile(LOG_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the log file:', err);
      return res.status(500).send({ message: 'Error reading the log file.' });
    }
    res.send(data);
  });
});

module.exports = router;
