const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.NODE_ENV = 'production') {
    sequelize = new Sequelize(
        process.env.PROD_DATABASE, 
        process.env.PROD_DB_USER, 
        process.env.PROD_DB_PASSWORD, 
        {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // <<<<<<< YOU NEED THIS
                }
            },
            host: process.env.PROD_DB_HOST,
            port: process.env.PROD_DB_PORT,
        }
    );
} else {

    sequelize = new Sequelize(
        process.env.DEV_DATABASE, 
        process.env.DEV_DB_USER, 
        process.env.DEV_DB_PASSWORD, 
        {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: '3306',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

        }
    );

}

module.exports = sequelize;
