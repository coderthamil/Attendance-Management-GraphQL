const { DataTypes } = require("sequelize");
const dbconnection = require("../db_setup");

const teacher_model = dbconnection.define(
  "teacher",
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
    tableName: "teacher",
  }
);

module.exports = teacher_model;
