const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Product = sequelize.define("Product", {
  // Define Product model attributes here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
});

// Define associations
Product.belongsTo(Category);
Category.hasMany(Product);

Product.belongsToMany(Tag, { through: "ProductTag" });
Tag.belongsToMany(Product, { through: "ProductTag" });

module.exports = Product;
