import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

/* ===============================
   ROUTE FILES
=============================== */
import donorRoutes from "./routes/donorRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import auth from "./middleware/authMiddleware.js";

const app = express();
const PORT = 3000;

/* ===============================
   HTTP SERVER + SOCKET.IO
=============================== */
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

/* ===============================
   DATABASE CONNECTION
=============================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/lifelink")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* ===============================
   __dirname FIX FOR ES MODULES
=============================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===============================
   TEMPLATE ENGINE (EJS)
=============================== */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ===============================
   GLOBAL MIDDLEWARE
=============================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "lifelinksecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
);

/* Static Folder */
app.use(express.static("public"));

/* Custom Logger Middleware */
app.use((req, res, next) => {
  console.log(`Request Received: ${req.method} ${req.url}`);
  next();
});

/* ===============================
   SOCKET.IO
=============================== */
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.emit("message", "Welcome to LifeLink Live Server ✅");

  socket.on("chat-message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

/* ===============================
   BASIC ROUTES
=============================== */
app.get("/", (req, res) => {
  res.send("Welcome to LifeLink Organ Donation System");
});

app.get("/file-data", (req, res) => {
  fs.readFile("public/index.html", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.send(data);
  });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/stream", (req, res) => {
  const stream = fs.createReadStream("public/index.html");
  stream.pipe(res);
});

/* ===============================
   SSR ROUTES (EJS)
=============================== */
app.get("/ssr", (req, res) => {
  res.render("home", {
    title: "LifeLink SSR Page",
    message: "This page is rendered from server using EJS Template Engine."
  });
});

app.get("/ssr-home", (req, res) => {
  const donors = [
    { name: "Payal", blood: "B+", city: "Ambala" },
    { name: "Mehak", blood: "O+", city: "Chandigarh" },
    { name: "Riya", blood: "A-", city: "Delhi" }
  ];

  res.render("home", { donors });
});

app.get("/donors-page", (req, res) => {
  const donors = [
    { name: "Payal", blood: "B+" },
    { name: "Mehak", blood: "O+" },
    { name: "Riya", blood: "A-" }
  ];

  res.render("donors", { donors });
});

/* ===============================
   COOKIE ROUTES
=============================== */
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Payal");
  res.send("Cookie Set Successfully");
});

app.get("/get-cookie", (req, res) => {
  res.json(req.cookies);
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie Cleared");
});

/* ===============================
   SESSION ROUTES
=============================== */
app.get("/visit", (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.send(`Visited ${req.session.views} times`);
});

app.get("/login-session", (req, res) => {
  req.session.user = "Payal";
  res.send("User stored in session");
});

app.get("/profile-session", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user}`);
  } else {
    res.send("No Session Found");
  }
});

app.get("/logout-session", (req, res) => {
  req.session.destroy(() => {
    res.send("Session Destroyed");
  });
});

/* ===============================
   ROUTER LEVEL ROUTES
=============================== */
app.use("/donor", donorRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/patient", patientRoutes);
app.use("/auth", authRoutes);

/* ===============================
   PROTECTED ROUTE (JWT)
=============================== */
app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Protected Profile Data",
    user: req.user
  });
});

/* ===============================
   ERROR TEST ROUTE
=============================== */
app.get("/error", (req, res, next) => {
  next(new Error("Something went wrong"));
});

/* ===============================
   GLOBAL ERROR HANDLER
=============================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message
  });
});

/* ===============================
   SERVER START
=============================== */
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});