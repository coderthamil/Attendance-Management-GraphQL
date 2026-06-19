const { DataTypes } = require("sequelize");
const dbconnection = require("../db_setup");

const schedule_model = dbconnection.define(
  "schedule",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    day: {
      type: DataTypes.STRING,  
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time:{
      type:DataTypes.STRING,
      allowNull:false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "schedule",   
           
  }
);

module.exports= schedule_model;