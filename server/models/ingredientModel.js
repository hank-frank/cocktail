const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Ingredient = sequelize.define('ingredient', {
    id_ingredient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ingredient_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    }
});

module.exports = Ingredient;
