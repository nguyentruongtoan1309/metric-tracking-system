const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/dbHelper');
const { METRIC_TYPE, DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../constants/metrics');

class Metric extends Model {}
Metric.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    value: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.ENUM(Object.values(METRIC_TYPE)), allowNull: false },
    unit: {
      type: DataTypes.ENUM([...Object.values(DISTANCE_UNITS), ...Object.values(TEMPERATURE_UNITS)]),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'metrics',
  },
);

module.exports = Metric;
