// middleware/auth.js
const auth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== "12345") {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }
  next();
};

module.exports = auth;
