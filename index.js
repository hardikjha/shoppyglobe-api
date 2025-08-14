const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });

// Routes

app.get("/", (req, res) => res.send("ShoppyGlobe API running"));

app.use("/products", require("./routes/products"));
app.use("/auth", require("./routes/auth"));
app.use("/cart", require("./routes/cart"));

// Central error handling useful for unexpected errors

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
