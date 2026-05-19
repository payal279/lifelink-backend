import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "lifelink_secret";

/*REGISTER*/
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "Registered Successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/*JWT LOGIN*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Success",
      token
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/*SESSION LOGIN*/
router.post("/session-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    res.json({
      message: "Session Login Success",
      user: req.session.user
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

/*SESSION PROFILE*/
router.get("/session-profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  res.json({
    user: req.session.user
  });
});

/*SESSION LOGOUT*/
router.get("/session-logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      message: "Logged Out Successfully"
    });
  });
});

export default router;