
async function checkActionUpdatePayload(req, res, next) {
    if (
        req.body.description &&
        req.body.notes &&
        req.body.project_id &&
        req.body.completed !== undefined
    ) {
        next()
    } else {
        next({
        status: 400,
        message: 'Please provide description, notes, completed and the id of the project',
    });
    }
}

async function checkActionCreatePayload (req, res, next) {
    if ( req.body.description && req.body.project_id && req.body.notes) {
        next()
    } else {
        next({
            status: 400,
            message: 'Please provide description, notes and the id of the project'
        })
    }
}

module.exports = { checkActionUpdatePayload, checkActionCreatePayload };
