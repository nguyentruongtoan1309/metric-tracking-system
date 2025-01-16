const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/dbHelper');

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'users',
  },
);

module.exports = User;
