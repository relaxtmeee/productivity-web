const Router = require('express');
const taskController = require('../controller/taskController');

const router = new Router();

router.post('/', taskController.create);
router.get('/', taskController.getAll);

module.exports = router;