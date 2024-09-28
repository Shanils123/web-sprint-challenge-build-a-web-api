const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

function validateActionData(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({
            message: 'Project ID, description, and notes are required'
        });
    }
    next();
}

async function validateProjectId(req, res, next) {
    const { project_id } = req.body; 
    try {
        const project = await Projects.get(project_id);
        if (project) {
            next();
        } else {
            res.status(404).json({ message: 'Invalid project ID' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve project' });
    }
}

module.exports = { validateActionData, validateProjectId };
