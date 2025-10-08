const express = require("express");
const Product = require("../models/product");
const validateProduct = require("../middleware/validateProduct");
const router = express.Router();

// @desc   Get all products
// @route  GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err); // send to global error handler
  }
});

// @desc   Get a product by ID
// @route  GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// @desc   Create a new product
// @route  POST /api/products
router.post("/", validateProduct, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
});

// @desc   Update a product
// @route  PUT /api/products/:id
router.put("/:id", validateProduct, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// @desc   Delete a product
// @route  DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
