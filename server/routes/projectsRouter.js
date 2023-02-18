const Router = require('express');
const projectsController = require('../controller/projectsController');

const router = new Router();

router.post('/', projectsController.create);
router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getOne);

module.exports = router;