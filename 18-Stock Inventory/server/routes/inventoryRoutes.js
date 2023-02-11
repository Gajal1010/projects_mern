const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const router = express.Router();
app.use(express.json());

const {
  getInventories,
  getInventory,
  deleteInventory,
  addInventory,
  editInventory,
} = require("../controllers/inventoriesControllers");

// get all inventories and add a new inventory
router.get("/", getInventories).post("/", addInventory);
// get inventory details and edit inventory
router.get("/item/:id", getInventory).put("/item/:id", editInventory);
// delete inventory
router.delete("/:id", deleteInventory);

module.exports = router;
