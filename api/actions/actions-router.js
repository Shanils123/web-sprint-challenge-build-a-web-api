// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
//const Projects = require('../projects/projects-model');
const { checkActionUpdatePayload, checkActionCreatePayload } = require('./actions-middlware');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        console.log(actions)
        res.json(actions); 
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve actions' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.json(action);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve action' });
    }
});


// router.post('/', async (req, res) => {
//     const { project_id, description, notes } = req.body;
//     if (!project_id || !description || !notes) {
//         return res.status(400).json({ message: 'Project ID, description, and notes are required' });
//     }

//     try {
//         const projectExists = await Projects.get(project_id);
//         if (!projectExists) {
//             return res.status(400).json({ message: 'Invalid project ID' });
//         }

//         const newAction = await Actions.insert({ project_id, description, notes });
//         res.status(201).json(newAction);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to create action' });
//     }
// });

router.post('/', checkActionCreatePayload, async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create action' });
    }
});


router.put('/:id', checkActionUpdatePayload, async (req, res) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        res.status(200).json(updatedAction)
    } catch (err) {
        res.status(500).json({ message: 'Failed to update action' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete action' });
    }
});

module.exports = router;