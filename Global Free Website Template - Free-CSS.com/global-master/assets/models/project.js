const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  requiredSkills: [String],
  status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);