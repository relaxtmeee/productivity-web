const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}, 
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    // description: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false}
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}
})

User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

Category.hasMany(Project);
Project.belongsTo(Category);

Category.hasMany(Task);
Task.belongsTo(Category);

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = {
    User,
    Project,
    Category,
    Task,
    Post
}
