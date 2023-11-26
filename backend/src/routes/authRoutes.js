const express = require('express');
const User = require('../models/User'); // Adjust the path as needed
const router = express.Router();
const bcrypt = require('bcrypt');


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

// Profile update route
router.put('/update-profile', async (req, res) => {
    try {
      // Extract User ID and new data from request body
      const { userId, newUsername, newPassword } = req.body;
  
      // Query the user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      // Update user data
      if (newUsername) user.username = newUsername;
      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }
  
      // Save changes
      await user.save();
      res.send({ message: "Profile updated successfully." });
    } catch (error) {
      res.status(500).send({ message: "Error updating profile." });
    }
  });
  
// Route to request a password reset
router.post('/request-password-reset', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      // Generate a reset token (this should be a unique and secure token)
      const resetToken = "generated-reset-token"; // Replace with actual token generation
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();
  
      // Send the reset token (in a real application, send it via email)
      res.send({ resetToken: resetToken });
    } catch (error) {
      res.status(500).send({ message: "Error requesting password reset." });
    }
  });
  
// Route to reset the password
router.post('/reset-password', async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
  
      if (!user) {
        return res.status(400).send({ message: "Invalid or expired password reset token." });
      }
  
      // Reset the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.send({ message: "Password has been reset successfully." });
    } catch (error) {
      res.status(500).send({ message: "Error resetting password." });
    }
});
  


module.exports = router;
