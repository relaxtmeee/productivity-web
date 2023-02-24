const {Task} = require('../models/models');

class TaskController {
    async create (req, res, next) {
        const { name, description, status, projectId, categoryId } = req.body;
        const task = await Task.create({name, description, status, projectId, categoryId});
        return res.json(task);
    }

    async getAll (req, res, next) {
        const { projectId } = req.query;
        const task = await Task.findAll({where: {projectId}});
        return res.json(task);
    }

    async deleteOne (req, res, next) {
        const { id } = req.params;
        const task = await Task.destroy({where: {id}})
        return res.json(task);
    }

}

module.exports = new TaskController();