const Router = require('express');
const taskController = require('../controller/taskController');

const router = new Router();

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.delete('/:id', taskController.deleteOne);

module.exports = router;