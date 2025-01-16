const { sequelize } = require('../utils/dbHelper');
const logger = require('../utils/logger');
const Metric = require('./Metric');
const User = require('./User');

User.hasMany(Metric, {
  foreignKey: 'userId',
});
Metric.belongsTo(User);

async function dbInitialize() {
  try {
    await sequelize.authenticate();
    logger.info('Connection Postgre successfully.');
    await sequelize.sync();
  } catch (error) {
    logger.error('Unable to connect Postgre:', error);
  }
}

module.exports = {
  dbInitialize,
  User,
  Metric,
};
