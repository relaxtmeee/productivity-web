const {Project, Task, Category} = require('../models/models');

class CategoryController {
    async create (req, res, next) {
        const { name, status, userId } = req.body;
        const category = await Category.create({name, status, userId});
        return res.json(category);
    }

    async getAll (req, res, next) {
        const { userId } = req.query;
        const category = await Category.findAll({where: { userId }});
        return res.json(category);
    }

    async getOne (req, res, next) {
        const { id } = req.params;
        const category = await Category.findOne({ where: {id} });
        return res.json(category);
    }

    async deleteOne (req, res, next) {
        const { id } = req.params;
        const post = await Category.destroy({where: {id}})
        return res.json(post);
    }

    async deleteAll (req, res, next) {
        const { id } = req.query;
        try {
            await Task.destroy({where: {categoryId: id}})
                .then(async () => {
                    await Project.destroy({where: {categoryId: id}})
                })
                .then(async () => {
                    await Category.destroy({where: {id}})
                })
                .then((data) => {
                    return res.json(data);
                })

        } catch (error) {
            return error
        }
    }
}

module.exports = new CategoryController();