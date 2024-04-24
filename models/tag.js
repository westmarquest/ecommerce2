const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Tag = sequelize.define("Tag", {
  // Define Tag model attributes here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Tag.belongsToMany(Product, { through: "ProductTag" });
Product.belongsToMany(Tag, { through: "ProductTag" });

module.exports = Tag;
