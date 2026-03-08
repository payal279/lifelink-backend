const express = require("express");
const path = require("path");
const fs = require("fs");
const getDonors = require("./donor");

const app = express();

// static middleware
app.use(express.static("public"));

// custom middleware
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to LifeLink Organ Donation System");
});

// Donor route
app.get("/donor", (req, res) => {
    const donors = getDonors();
    res.json(donors);
});

// Hospital route
app.get("/hospital", (req, res) => {
    res.status(200).send("Hospital Endpoint");
});

// Send static file
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// File stream
app.get("/stream", (req, res) => {
    const stream = fs.createReadStream("public/index.html");
    stream.pipe(res);
});

// Exception handling
app.get("/error", (req, res) => {
    try {
        throw new Error("Something went wrong");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});