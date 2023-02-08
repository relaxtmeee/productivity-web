const Router = require('express');
const postController = require('../controller/postController');

const router = new Router();

router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.delete('/', postController.deleteOne);

module.exports = router;