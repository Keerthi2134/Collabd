const Project = require('../models/project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;
    const project = await Project.create({ title, description, requiredSkills, owner: req.user.id });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email').populate('contributors', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, requiredSkills, status } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { title, description, requiredSkills, status },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found or you are not the owner' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!project) return res.status(404).json({ message: 'Project not found or you are not the owner' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.joinProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.contributors.includes(req.user.id)) return res.status(400).json({ message: 'You are already a contributor' });
    project.contributors.push(req.user.id);
    await project.save();
    res.json({ message: 'Joined project successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};