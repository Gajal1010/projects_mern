const express = require("express");
const connectDB = require("./config/db");
const app = express();
var cors = require("cors");
/**
 * Loading the routes
 */
const customer = require("./server/routes/api/Customer");

/**
 * Connecting to Mongodb
 */
connectDB();

/*Enabling Cors*/
app.use(cors({ origin: true, credentials: true }));

/*Initializing Express middleware*/
app.use(express.json({ extended: false }));

/** Api */
app.get("/", (req, res) => res.send("Api works!"));

// use Routes
app.use("/api", customer);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
