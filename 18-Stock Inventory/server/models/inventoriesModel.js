const mongoose = require("mongoose");

const inventoriesSchema = mongoose.Schema({
  id: String,
  warehouseID: String,
  warehouseName: String,
  itemName: String,
  category: String,
  description: String,
  status: String,
  quantity: Number,
});

module.exports = mongoose.model("Inventories", inventoriesSchema);
