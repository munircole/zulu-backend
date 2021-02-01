var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        team_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },

        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }

    });

    return Team;
};
