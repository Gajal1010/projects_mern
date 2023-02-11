const asyncHandler = require("express-async-handler");
const Inventories = require("../models/inventoriesModel");
const { v4: uuidv4 } = require("uuid");

//get all inventories

const getInventories = asyncHandler(async (req, res) => {
  try {
    const inventories = await Inventories.find();
    res.status(200).json(inventories);
  } catch (e) {
    console.log(e);
  }
});

//get inventory by id
const getInventory = asyncHandler(async (req, res) => {
  try {
    const inventory = await Inventories.find({ id: req.params.id });
    res.status(200).json(inventory);
  } catch (e) {
    console.log(e);
  }
});

//delete inventory by id
const deleteInventory = asyncHandler(async (req, res) => {
  try {
    await Inventories.deleteOne({ id: req.params.id });
    const updatedInventories = await Inventories.find();
    res.status(200).json(updatedInventories);
  } catch (e) {
    console.log(e);
  }
});

// add a new inventory

const addInventory = asyncHandler(async (req, res) => {
  try {
    const {
      warehouseID,
      warehouseName,
      itemName,
      description,
      category,
      status,
      quantity,
    } = req.body;

    if (
      (warehouseID !== "",
      warehouseName !== "",
      itemName !== "",
      description !== "",
      category !== "",
      status !== "",
      quantity !== "")
    ) {
      const newItem = {
        id: uuidv4(),
        warehouseID: warehouseID,
        warehouseName: warehouseName,
        itemName: itemName,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
      };
      await Inventories.create(newItem);
      const updatedInventories = await Inventories.find();
      res.status(200).json(updatedInventories);
    }
  } catch (e) {
    console.log(e);
  }
});

//update an inventory

const editInventory = asyncHandler(async (req, res) => {
  try {
    await Inventories.findOneAndUpdate(
      { id: req.params.id },
      {
        warehouseID: req.body.warehouseID,
        warehouseName: req.body.warehouseName,
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity,
      }
    );
    const updatedInventories = await Inventories.find();
    res.status(200).json(updatedInventories);
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  getInventories,
  getInventory,
  deleteInventory,
  addInventory,
  editInventory,
};
