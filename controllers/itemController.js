const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");

exports.getAllItems = async (req, res) => {
  try {
    const result = await Item.findAll({
      include: [{ model: Category, as: "category", attributes: ["name"] }],
    });
    return res.status(200).json({ message: "Items fetched successfully!", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch Items.", error: error.message });
  }
};

exports.getSingleItem = async (req, res) => {
  try {
    const result = await Item.findByPk(req.params.id, {
      include: [{ model: Category, as: "category", attributes: ["name"] }],
    });
    if (result != null) {
      return res.status(200).json({ message: "Item fetched successfully!", data: result });
    } else {
      return res.status(404).json({ message: "Item not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch item.", error: error.message });
  }
};

exports.addNewItem = async (req, res) => {
  try {
    await Item.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categoryid: req.body.categoryid,
    });
    return res.status(200).json({ message: "Item added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add item.", error: error.message });
  }
};

exports.editItem = async (req, res) => {
  try {
    const result = await Item.findByPk(req.params.id);
    if (result != null) {
      await Item.update({ name: req.body.name, price: req.body.price, description: req.body.description, categoryid: req.body.categoryid }, { where: { id: req.params.id } });
      return res.status(200).json({ message: "Item updated successfully!" });
    }
    return res.status(404).json({ message: "Item not found." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update item.", error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const result = await Item.findAll({ where: { id: req.params.id } });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Item not found." });
    }
    await Item.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete item.", error: error.message });
  }
};
