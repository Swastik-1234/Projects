

const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const { ObjectId, default: mongoose } = require('mongoose');
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.secret_key);
    console.log('Decoded Token:', decoded);
    const user = await User.findById(decoded.userId);
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId1=new mongoose.Types.ObjectId(decoded.userId).valueOf();
    console.log(userId1);
    console.log(user._id.valueOf())
    if (userId1!==(user._id.valueOf())) {
      return res.status(403).json({ message: 'Invalid tokensd' });
    }
    req.user = user;
    next(); // Call next() after successful verification
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};
