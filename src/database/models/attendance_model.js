const { DataTypes } = require("sequelize");
const dbconnection = require("../db_setup");

const attendance_model = dbconnection.define(
  "attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roll_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // ✅ true = Present, false = Absent
      defaultValue: false,
    },
   
  },
  {
    tableName: "attendance",
  }
);

module.exports = attendance_model;
