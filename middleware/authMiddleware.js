// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, "lifelink_secret");
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token"
    });
  }
};

export default auth;