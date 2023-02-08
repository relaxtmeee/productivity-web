const Router = require('express');

const router = new Router();

const userRouter = require('./userRouter');
const projectRouter = require('./projectRouter');
const categoryRouter = require('./categoryRouter');
const taskRouter = require('./taskRouter');
const postRouter = require('./postRouter');

router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/category', categoryRouter);
router.use('/task', taskRouter);
router.use('/post', postRouter);

module.exports = router;