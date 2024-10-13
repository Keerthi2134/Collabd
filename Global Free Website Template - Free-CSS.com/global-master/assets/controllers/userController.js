const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, skills } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, skills }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSkillsList = async (req, res) => {
  try {
    const skills = await User.distinct('skills');
    res.json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};