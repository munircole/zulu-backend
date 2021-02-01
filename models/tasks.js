var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('tasks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        project_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        taskName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        priority: {
            type: Sequelize.STRING,
            allowNull: false
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false
        },

        start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },

        end_date: {
            type: Sequelize.DATE,
            allowNull: false
        },

        assigned_to: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },

        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },

    });

    return Task;
};
