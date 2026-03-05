const express = require("express");
const path = require("path");
const fs = require("fs");   
const getDonors = require("./donor");

const app = express();

// static files serve
app.use(express.static("public"));

// res.send()
app.get("/", (req, res) => {
    res.send("Welcome to LifeLink Organ Donation System");
});

// res.json()
app.get("/donor", (req, res) => {
    const donors = getDonors();
    res.json(donors);
});

// res.status()
app.get("/hospital", (req, res) => {
    res.status(200).send("Hospital Endpoint");
});

// res.sendFile()
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// File stream route
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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});