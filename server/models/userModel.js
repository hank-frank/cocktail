const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: false
    }
});

module.exports = User;
