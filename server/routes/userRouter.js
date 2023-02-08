const Router = require('express');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;