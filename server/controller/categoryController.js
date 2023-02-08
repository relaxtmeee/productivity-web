const {Category} = require('../models/models');

class CategoryController {
    async create (req, res, next) {
        const { name, description, status, userId } = req.body;
        const category = await Category.create({name, description, status, userId});
        return res.json(category);
    }

    async getAll (req, res, next) {
        const category = await Category.findAll();
        return res.json(category);
    }

    async getOne (req, res, next) {
        const { id } = req.params;
        const category = await Category.findOne({ where: {id} });
        return res.json(category);
    }
}

module.exports = new CategoryController();