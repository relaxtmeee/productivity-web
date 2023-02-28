const ApiError = require('../error/ApiError');
const { Habit } = require('../models/models');

class HabitController {

    async create (req, res, next) {
        const { name, dates, userId } = req.body;
        const habit = await Habit.create({name, dates, userId});
        return res.json(habit);
    }

    async getAll (req, res, next) {
        const { userId } = req.query;
        const habit = await Habit.findAll({where: {userId}});
        return res.json(habit);
    }

    async deleteOne (req, res, next) {
        const { id } = req.params;
        const habit = await Habit.destroy({where: {id}})
        return res.json(habit);
    }
}

module.exports = new HabitController();