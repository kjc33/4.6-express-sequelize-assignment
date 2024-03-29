const { Sequelize } = require("sequelize");

const password = process.env.DB_PASSWORD;

// DB Connection Configuration
const sequelize = new Sequelize("ecommerce", "postgres", password, {
  host: "localhost",
  dialect: "postgres",
});

// Test Connection Function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return false;
  }
}

module.exports = { sequelize, testConnection };
