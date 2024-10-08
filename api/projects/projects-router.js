const express = require('express');
const Projects = require('./projects-model');
const { validateProjectData, validateProjectId } = require('./projects-middleware');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve projects' });
    }
});

router.get('/:id', validateProjectId, async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve project' });
    }
});


// router.get('/:id', async (req, res) => {
//     try {
//         const project = await Projects.get(req.params.id);
//         if (project) {
//             res.json(project);
//         } else {
//             res.status(404).json({ message: 'Project not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to retrieve project' });
//     }
// });


// router.post('/', async (req, res) => {
//     const { name, description, completed = false } = req.body;
//     if (!name || !description) {
//         res.status(400).json({ message: 'Name and description are required' });
//     } else {
//         try {
//         const newProject = await Projects.insert({ name, description, completed });
//         res.status(201).json(newProject);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to create project' });
//         }
//     }
// });

router.post('/', validateProjectData, async (req, res) => {
    const { name, description, completed = false } = req.body;
    try {
        const newProject = await Projects.insert({ name, description, completed });
        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create project' });
    }
});




router.put('/:id', validateProjectId, async (req, res) => {
    const { name, description, completed } = req.body; 
    if (!name || !description || completed === undefined) {
        return res.status(400).json({ message: 'Name, description, and completed status are required' });
    }
    try {
        const updatedProject = await Projects.update(req.params.id, { name, description, completed });
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update project' });
    }
});



router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const count = await Projects.remove(req.params.id);
        if (count) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve actions' });
    }
});

module.exports = router;
