const Router = require('express');
const habitController = require('../controller/habitController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/', authMiddleware, habitController.create);
router.get('/', authMiddleware, habitController.getAll);
router.delete('/:id', authMiddleware, habitController.deleteOne);
router.patch('/', habitController.patchAddDate);
router.patch('/:id', habitController.patchDeleteDate);

module.exports = router;