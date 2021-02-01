var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        contact_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.STRING,
            allowNull: false
        },

        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        profile_pics: {
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
        },

    });

    return User;
};
