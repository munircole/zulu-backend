var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Team_Member = sequelize.define('team_members', {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        team_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        user_role: {
            type: Sequelize.STRING,
            allowNull: false
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

    return Team_Member;
};
