const {Project, Task} = require('../models/models');

class ProjectController {
    async create (req, res, next) {
        const { name, description, status, userId, categoryId } = req.body;
        try {
            const project = await Project.create({name, description, status, userId, categoryId});
            console.log(project);
            return res.json(project);
        } catch (error) {
            return error
        }

    }

    async getAll (req, res, next) {
        const { categoryId } = req.query;
        try {
            const projects = await Project.findAll({where: {categoryId}});
            return res.json(projects);
        } catch (error) {
            return error
        }
    }

    async getOne (req, res, next) {
        const { id } = req.params;
        try {
            const project = await Project.findOne({where: {id}});
            return res.json(project);
        } catch (error) {
            return error
        }
    }

    async deleteOne (req, res, next) {
        const { id } = req.params;
        try {
            await Task.destroy({where: {projectId: id}})
                .then(async () => {
                    await Project.destroy({where: {id}})
                })
                .then((data => {
                    return res.json(data);
                }))

        } catch (error) {
            return error
        }
    }
}

module.exports = new ProjectController();