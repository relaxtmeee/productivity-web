const Router = require('express');
const categoryController = require('../controller/categoryController');

const router = new Router();

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);

module.exports = router;