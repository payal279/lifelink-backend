import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import auth from "./middleware/authMiddleware.js";

import setupSocket from "./sockets/socket.js";

import donorRoutes from "./routes/donorRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import cookieRoutes from "./routes/cookieRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

import postgresDonorRoutes from "./Routes/postgresDonorRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

const app = express();
const server = createServer(app);

/* Database */
connectDB();

/* __dirname for ES Modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* View Engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Global Middleware */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", postgresDonorRoutes);
app.use("/", uploadRoutes);

app.use(
  session({
    secret: "lifelinksecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(express.static("public"));
app.use(logger);

/* Routes */
app.use("/", pageRoutes);
app.use("/", cookieRoutes);
app.use("/", sessionRoutes);

app.use("/donor", donorRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/patient", patientRoutes);
app.use("/auth", authRoutes);

/* Protected Route */
app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Protected Profile Data",
    user: req.user,
  });
});

/* Error Handler */
app.use(errorHandler);

/* Socket Setup */
const io = setupSocket(server);
app.set("io", io);

export default server;