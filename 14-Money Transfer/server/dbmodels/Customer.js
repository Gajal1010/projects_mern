/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  account_balance: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
  },
  account_type: {
    type: String,
    default: "checking",
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
