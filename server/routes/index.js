const Router = require('express');

const router = new Router();

const userRouter = require('./userRouter');
const projectsRouter = require('./projectsRouter');
const categoryRouter = require('./categoryRouter');
const taskRouter = require('./taskRouter');
const postRouter = require('./postRouter');
const habitRouter = require('./habitRouter');

router.use('/user', userRouter);
router.use('/projects', projectsRouter);
router.use('/category', categoryRouter);
router.use('/task', taskRouter);
router.use('/post', postRouter);
router.use('/habits', habitRouter);


module.exports = router;