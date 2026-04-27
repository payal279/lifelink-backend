// controllers/pageController.js
import fs from "fs";
import path from "path";

export const home = (req, res) => {
  res.send("Welcome to LifeLink Organ Donation System");
};

export const fileData = (req, res) => {
  fs.readFile("public/index.html", "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.send(data);
  });
};

export const about = (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "about.html"));
};

export const stream = (req, res) => {
  const stream = fs.createReadStream("public/index.html");
  stream.pipe(res);
};

export const errorRoute = (req, res, next) => {
  next(new Error("Something went wrong"));
};