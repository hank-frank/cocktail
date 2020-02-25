const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: '3306',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

    }
);

module.exports = sequelize;
