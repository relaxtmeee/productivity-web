const {Project} = require('../models/models');

class ProjectController {
    async create (req, res, next) {
        const { name, description, status, userId, categoryId } = req.body;
        const project = await Project.create({name, description, status, userId, categoryId});
        return res.json(project);
    }

    async getAll (req, res, next) {
        const { userId } = req.body;
        const project = await Project.findAll({where: userId});
        return res.json(project);
    }

    async getOne (req, res, next) {
        const { id } = req.params;
        const project = await Project.findOne({where: {id}});
        return res.json(project);
    }
}

module.exports = new ProjectController();