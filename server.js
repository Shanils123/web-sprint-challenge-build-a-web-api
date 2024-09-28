const express = require('express');
const server = express();

server.use(express.json());

const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

const PORT = process.env.PORT || 9000; 
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
