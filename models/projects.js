var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('projects', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        team_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

        projectName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        requirement: {
            type: Sequelize.STRING,
            allowNull: false
        },

        client: {
            type: Sequelize.STRING,
            allowNull: false
        },

        priority: {
            type: Sequelize.STRING,
            allowNull: false
        },

        project_type: {
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


        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },

        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },

    });

    return Project;
};
