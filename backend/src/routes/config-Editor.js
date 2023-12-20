const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the config file
const configFilePath = path.join(__dirname, '../../test/test-config.json');