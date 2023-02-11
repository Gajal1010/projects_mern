const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();

const warehousesRoutes = require("./routes/warehousesRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

//cors middleware
app.use(cors());

//middleware to give us access to req.body
app.use(express.json());

app.use("/warehouses", warehousesRoutes);

app.use("/inventories", inventoryRoutes);

//listener
app.listen(PORT, () => {
  console.log(`We are live!✈️ on ${PORT}`);
});

app.use("/warehouses", warehousesRoutes);

app.use("/inventories", inventoryRoutes);
