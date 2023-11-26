const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define the schema for User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Add additional fields like email if needed
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
