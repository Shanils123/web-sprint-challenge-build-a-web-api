const Projects = require('../projects/projects-model');

async function validateProjectId(req, res, next) {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: 'Invalid project ID' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve project' });
    }
}

function validateProjectData(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({
            message: 'Name and description are required'
        });
    }
    next();
}


module.exports = { validateProjectId, validateProjectData };
