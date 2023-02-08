const {Task} = require('../models/models');

class TaskController {
    async create (req, res, next) {
        const { name, description, status, projectId } = req.body;
        const task = await Task.create({name, description, status, projectId});
        return res.json(task);
    }

    async getAll (req, res, next) {
        const task = await Task.findAll();
        return res.json(task);
    }
}

module.exports = new TaskController();