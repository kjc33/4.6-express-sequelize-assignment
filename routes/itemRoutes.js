const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.getAllItems);

router.get("/:id", itemController.getSingleItem);

router.post("/", itemController.addNewItem);

router.put("/:id", itemController.editItem);

router.delete("/:id", itemController.deleteItem);

module.exports = router;
