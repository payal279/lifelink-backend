import jwt from "jsonwebtoken";

const SECRET_KEY = "lifelink_secret";

export default function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "No Token"
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      message: "Invalid Token"
    });
  }
}