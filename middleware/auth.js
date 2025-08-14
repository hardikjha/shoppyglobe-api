const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const header = req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
