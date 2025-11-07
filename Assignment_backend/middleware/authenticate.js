const jwt = require("jsonwebtoken");

// Middleware to check JWT token from cookies
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token; 
    console.log(token)
    

    if (!token) {
      return res.status(401).json({ message: "No token found. Please login first." });
    }

    const decoded = jwt.verify(token,"MY_SECRET_KEY");

    
    req.userId = decoded.id
    console.log('Usere Id')
    console.log(req.userId);


    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
