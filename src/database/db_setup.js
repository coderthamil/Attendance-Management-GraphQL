
const { Sequelize } = require("sequelize");

const dbconnection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "Attendnce_Management",
  username: "postgres",
  password: "12345678",
});

const dbsync = async () => {
  const connection = await dbconnection.sync();
  return connection;
};
dbsync();

module.exports = dbconnection;
