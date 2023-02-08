const Router = require('express');
const projectController = require('../controller/projectController');

const router = new Router();

router.post('/', projectController.create);
router.get('/', projectController.getAll);
router.get('/:id', projectController.getOne);

module.exports = router;