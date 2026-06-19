const { DataTypes } = require("sequelize");
const dbconnection = require("../db_setup");

const dashboard_model = dbconnection.define(
  "dashboard",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    total_students: {
      type: DataTypes.STRING,  
      allowNull: false,
    },
    total_classes: {
      type: DataTypes.STRING,  
    },
    total_schedules: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_attendance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "dashboard",  
  }
);

module.exports = dashboard_model;