const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Receptacle = sequelize.define('receptacle', {
    id_receptacle: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    receptacle_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    cocktail_id: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: true
    }
});

module.exports = Receptacle;
