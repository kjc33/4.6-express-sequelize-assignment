const Category = require("../models/categoryModel");
const Item = require("../models/itemModel");

exports.getAllCategories = async (req, res) => {
  try {
    const result = await Category.findAll();
    return res.status(200).json({ message: "Categories fetched successfully!", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch categories.", error: error.message });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const result = await Category.findByPk(req.params.id);
    if (result != null) {
      return res.status(200).json({ message: "Category fetched successfully!", data: result });
    } else {
      return res.status(404).json({ message: "Category not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch category.", error: error.message });
  }
};

exports.addNewCategory = async (req, res) => {
  try {
    await Category.create({
      name: req.body.name,
    });
    return res.status(200).json({ message: "Category added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add category.", error: error.message });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const result = await Category.findByPk(req.params.id);
    if (result != null) {
      await Category.update({ name: req.body.name }, { where: { id: req.params.id } });
      return res.status(200).json({ message: "Category updated successfully!" });
    }
    return res.status(404).json({ message: "Category not found." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update category.", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.findAll({ where: { id: req.params.id } });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Category not found." });
    }
    await Category.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete category.", error: error.message });
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const items = await Item.findAll({
      where: { categoryid: categoryId },
    });
    return res.status(200).json({ message: "Items fetched successfully!", data: items });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch items for the category.", error: error.message });
  }
};
