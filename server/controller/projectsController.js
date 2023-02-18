const {Project} = require('../models/models');

class ProjectController {
    async create (req, res, next) {
        const { name, description, status, userId, categoryId } = req.body;
        console.log(1);
        const project = await Project.create({name, description, status, userId, categoryId});
        return res.json(project);
    }

    async getAll (req, res, next) {
        const { categoryId } = req.query;
        const projects = await Project.findAll({where: {categoryId}});
        return res.json(projects);
    }

    async getOne (req, res, next) {
        const { id } = req.params;
        const project = await Project.findOne({where: {id}});
        return res.json(project);
    }
}

module.exports = new ProjectController();