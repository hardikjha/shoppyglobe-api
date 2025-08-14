const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const router = express.Router();

// GET /products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /products/:id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid product id" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;
