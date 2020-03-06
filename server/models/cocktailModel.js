const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cocktail = sequelize.define('cocktail', {
    id_cocktail: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    api_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    cocktail_name: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: false
    },
    instructions: {
        type: Sequelize.STRING(1500),
        allowNull: false,
        foreignKey: false
    },
    image_url: {
        type: Sequelize.STRING(800),
        allowNull: true,
        foreignKey: false
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: false
    }
});

module.exports = Cocktail;
