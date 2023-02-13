const ApiError = require('../error/ApiError');
const { Post } = require('../models/models');
const jwt = require('jsonwebtoken');

class PostController {
    async create (req, res, next) {
        const { name, description, date, userId } = req.body;
        const post = await Post.create({name, description, date, userId});
        return res.json(post);
    }

    async getAll (req, res, next) {
        const { userId } = req.query;
        const post = await Post.findAll({where: {userId}});
        return res.json(post);
    }

    async getOne (req, res, next) {
        const { id } = req.params;

        const post = await Post.findOne({where: {id}});
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(decoded.id != post.userId) {
            return res.status(403).json({message: 'Нет доступа'})
        }
        return res.json(post);
    }

    async deleteOne (req, res, next) {
        const { id } = req.params;
        const post = await Post.destroy({where: {id}})
        return res.json(post);
    }
}

module.exports = new PostController();