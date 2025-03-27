const User = require('../models/User');
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { getUserDetails, getAllUsers };