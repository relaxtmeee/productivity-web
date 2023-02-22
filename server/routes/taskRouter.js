const Router = require('express');
const taskController = require('../controller/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, taskController.create);
router.get('/', authMiddleware, taskController.getAll);
router.delete('/:id', authMiddleware, taskController.deleteOne);

module.exports = router;