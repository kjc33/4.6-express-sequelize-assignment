const Category = require("./categoryModel");
const Item = require("./itemModel");

Item.belongsTo(Category, { foreignKey: "categoryid", as: "category" });
Category.hasMany(Item, { foreignKey: "categoryid", as: "items" });

module.exports = { Category, Item };
