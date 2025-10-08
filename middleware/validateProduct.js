// middleware/validateProduct.js
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      error: "Product validation failed: 'name' and 'price' are required.",
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error: "Product validation failed: 'price' must be a positive number.",
    });
  }

  next(); // Data is valid, move to controller
};

module.exports = validateProduct;
