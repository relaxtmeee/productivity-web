const Router = require('express');
const postController = require('../controller/postController');
const checkCurrentUserMiddleware = require('../middleware/checkCurrentUserMiddleware');

const router = new Router();

router.post('/', postController.create);
router.get('/', checkCurrentUserMiddleware() ,postController.getAll);
router.get('/:id', postController.getOne);
router.delete('/', postController.deleteOne);

module.exports = router;