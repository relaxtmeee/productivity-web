const Router = require('express');
const categoryController = require('../controller/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, categoryController.create);
router.get('/', authMiddleware, categoryController.getAll);
router.get('/:id', authMiddleware, categoryController.getOne);
router.delete('/:id', authMiddleware, categoryController.deleteOne);
router.delete('/', authMiddleware, categoryController.deleteAll);

module.exports = router;