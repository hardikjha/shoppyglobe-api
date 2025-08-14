const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");

const router = express.Router();
router.use(auth);

// helper for resolving :id as cartItemId (preferred) or productId (fallback)

async function resolveCartItem(userId, id) {
  if (!mongoose.isValidObjectId(id)) return null;
  let item = await CartItem.findOne({ _id: id, userId });
  if (item) return item;
  // fallback: treat id as productId

  item = await CartItem.findOne({ userId, productId: id });
  return item;
}

// GET /cart  (not required by brief but helpful to test)

router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.user.id })
      .populate("productId", "name price description stockQuantity");
    res.json(items);
  } catch {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST /cart  { productId, quantity?=1 }

router.post("/", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body || {};
    if (!mongoose.isValidObjectId(productId)) return res.status(400).json({ error: "Invalid productId" });
    if (quantity <= 0) return res.status(400).json({ error: "quantity must be >= 1" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // upsert + stock check (limit to stockQuantity)

    const existing = await CartItem.findOne({ userId: req.user.id, productId });
    const newQty = (existing?.quantity || 0) + quantity;

    if (newQty > product.stockQuantity) {
      return res.status(400).json({ error: `Only ${product.stockQuantity} in stock` });
    }

    const item = await CartItem.findOneAndUpdate(
      { userId: req.user.id, productId },
      { $set: { userId: req.user.id, productId }, $inc: { quantity } },
      { new: true, upsert: true }
    );

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// PUT /cart/:id  { quantity }

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { quantity } = req.body || {};
    quantity = Number(quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ error: "quantity must be an integer >= 1" });
    }

    const item = await resolveCartItem(req.user.id, id);
    if (!item) return res.status(404).json({ error: "Cart item not found" });

    const product = await Product.findById(item.productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (quantity > product.stockQuantity) {
      return res.status(400).json({ error: `Only ${product.stockQuantity} in stock` });
    }

    item.quantity = quantity;
    await item.save();
    res.json(item);
  } catch {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

// DELETE /cart/:id

router.delete("/:id", async (req, res) => {
  try {
    const item = await resolveCartItem(req.user.id, req.params.id);
    if (!item) return res.status(404).json({ error: "Cart item not found" });

    await CartItem.deleteOne({ _id: item._id, userId: req.user.id });
    res.json({ message: "Removed from cart" });
  } catch {
    res.status(500).json({ error: "Failed to remove cart item" });
  }
});

module.exports = router;
