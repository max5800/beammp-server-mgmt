const express = require('express');
const User = require('../models/User'); // Adjust the path as needed
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    let user = new User({
      username: req.body.username,
      password: req.body.password, // Hashed password will be stored here later
    });

    await user.save();
    res.status(201).send({ message: "User successfully registered." });
  } catch (error) {
    res.status(500).send({ message: "Error during registration." });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Password verification
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Incorrect password." });
    }

    res.send({ message: "Successfully logged in." });
  } catch (error) {
    res.status(500).send({ message: "Error during login." });
  }
});

module.exports = router;
