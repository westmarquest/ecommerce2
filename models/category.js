const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Category = sequelize.define("Category", {
  // Define model attributes
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
