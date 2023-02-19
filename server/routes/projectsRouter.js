const Router = require('express');
const projectsController = require('../controller/projectsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, projectsController.create);
router.get('/', authMiddleware, projectsController.getAll);
router.get('/:id', authMiddleware, projectsController.getOne);

module.exports = router;