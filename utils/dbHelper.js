const { Sequelize } = require('sequelize');
const {
  database: { postgreConfig },
} = require('../config');
const logger = require('./logger');
const { uri, options } = postgreConfig;

const sequelize = new Sequelize(uri, {
  dialectOptions: options,
  logging: (msg) => (process.env.NODE_ENV === 'dev' ? logger.info(msg) : null),
});

module.exports = { sequelize };
