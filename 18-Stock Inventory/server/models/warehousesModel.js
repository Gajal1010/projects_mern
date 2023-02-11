const mongoose = require("mongoose");

const warehousesSchema = mongoose.Schema({
  id: String,
  name: String,
  address: String,
  city: String,
  country: String,
  contact: {
    name: String,
    position: String,
    phone: String,
    email: String,
  },
});

module.exports = mongoose.model("Warehouses", warehousesSchema);
