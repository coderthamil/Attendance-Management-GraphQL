const { DataTypes } = require("sequelize");
const dbconnection = require("../db_setup");

const principal_model = dbconnection.define(
  "principal",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "principal",
  }
);

module.exports = principal_model;
