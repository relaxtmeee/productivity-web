const Router = require('express');
const postController = require('../controller/postController');
const authMiddleware = require('../middleware/authMiddleware');
const getAllPostsMiddleware = require('../middleware/getAllPostsMIddleware');

const router = new Router();

router.post('/', authMiddleware, postController.create);
router.get('/', authMiddleware, getAllPostsMiddleware, postController.getAll);
router.get('/:id', authMiddleware, postController.getOne);
router.delete('/:id', authMiddleware, postController.deleteOne);

module.exports = router;