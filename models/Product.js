const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  stockQuantity: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
