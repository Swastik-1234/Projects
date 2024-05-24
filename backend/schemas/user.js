const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.statics.countAdmins = async function() {
  const count = await this.countDocuments({ role: 'admin' });
  return count;
};

// Middleware to ensure only one admin user can be registered
userSchema.pre('save', async function(next) {
  const adminCount = await this.constructor.countAdmins();
  if (this.role === 'admin' && adminCount > 0) {
    throw new Error('Only one admin user is allowed');
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
