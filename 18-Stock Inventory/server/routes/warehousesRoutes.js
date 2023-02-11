const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const {
  getWarehouses,
  getWarehouse,
  editWarehouse,
  deleteWarehouse,
  addWarehouse,
} = require("../controllers/warehousesControllers");

const router = express.Router({ mergeParams: true });
app.use(express.json());

//get all warehouses

router.get("/", getWarehouses);
// add a new inventory
router.post("/new", addWarehouse);
//get warehouse by id, edit a single warehouse, delete a single warehouse
router
  .get("/:id", getWarehouse)
  .put("/:id", editWarehouse)
  .delete("/:id", deleteWarehouse);

module.exports = router;
