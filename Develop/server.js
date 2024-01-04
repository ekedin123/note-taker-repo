//dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3003;

const app = express();
//middleware links
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//returns notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//get notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

//returns index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
