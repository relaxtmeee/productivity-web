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

    async patchAddDate (req, res, next) {
        const { id, date } = req.body;
        const habit = await Habit.findOne({where: {id}});
        const updatHabit = await habit.update({dates: [...habit.dates , new Date(date)]});
        return res.json(updatHabit);
    }

    async patchDeleteDate (req, res, next) {
        const { id } = req.params;
        const { date } = req.body;

        const habit = await Habit.findOne({where: {id}});
        const updatHabit = await habit.update({dates: habit.dates.filter(dat => new Date(dat).toISOString() != new Date(date).toISOString())});
        return res.json(updatHabit);
    }
}

module.exports = new HabitController();