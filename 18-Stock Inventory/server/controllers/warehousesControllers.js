const asyncHandler = require("express-async-handler");
const Warehouses = require("../models/warehousesModel");
const Inventories = require("../models/inventoriesModel");
const { v4: uuidv4 } = require("uuid");

//get all warehouses
const getWarehouses = asyncHandler(async (req, res) => {
  try {
    const warehouses = await Warehouses.find();
    res.status(200).json(warehouses);
  } catch (e) {
    console.log(e);
  }
});
//get a warehouse by id
const getWarehouse = asyncHandler(async (req, res) => {
  try {
    const warehouseById = await Warehouses.find({ id: req.params.id });

    if (!warehouseById) {
      res.status(400);
      throw new Error("Warehouse not found");
    }
    res.status(200).json(warehouseById);
  } catch (e) {
    console.log(e);
  }
});

//delete a warehouse by id
const deleteWarehouse = asyncHandler(async (req, res) => {
  try {
    await Warehouses.deleteOne({ id: req.params.id });
    await Inventories.deleteMany({ warehouseID: req.params.id });
    const updatedWarehouses = await Warehouses.find();
    res.status(200).json(updatedWarehouses);
  } catch (e) {
    console.log(e);
  }
});

//edit a warehouse by id
const editWarehouse = asyncHandler(async (req, res) => {
  try {
    await Warehouses.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        address: req.body.address,
        city: req.body.ctiy,
        country: req.body.country,
        contact: req.body.contact,
      }
    );
    const updatedWarehouses = await Warehouses.find();
    res.status(200).json(updatedWarehouses);
  } catch (e) {
    console.log(e);
  }
});

//add a new warehouse
const addWarehouse = asyncHandler(async (req, res) => {
  try {
    // Validate Phone Number, thanks Google
    const validatePhone = (phone) => {
      const regEx = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
      const isValid = regEx.test(phone);
      return isValid;
    };
    const {
      warehouseName,
      street,
      city,
      country,
      contactName,
      position,
      phone,
      email,
    } = req.body;

    if (
      warehouseName !== "" &&
      street !== "" &&
      city !== "" &&
      country !== "" &&
      contactName !== "" &&
      position !== "" &&
      phone !== "" &&
      validatePhone(phone) &&
      email !== "" &&
      email.includes("@")
    ) {
      const newWarehouse = {
        id: uuidv4(),
        name: warehouseName,
        address: street,
        city: city,
        country: country,
        contact: {
          name: contactName,
          position: position,
          phone: phone,
          email: email,
        },
      };
      await Warehouses.create(newWarehouse);
      const updatedWarehouses = await Warehouses.find();
      res.status(200).json(updatedWarehouses);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  getWarehouses,
  getWarehouse,
  deleteWarehouse,
  editWarehouse,
  addWarehouse,
};
