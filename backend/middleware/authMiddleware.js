const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔐 Incoming Auth Header:", authHeader); // Debug

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(" No token or invalid format"); // Debug
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token); // Debug

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token Verified. User:", decoded); // Debug
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid Token:", err.message); // Debug
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateUser };
