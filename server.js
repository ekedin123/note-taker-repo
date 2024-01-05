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

// posts notes
app.post("/api/notes", (req, res) => {
  let database = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newPost = req.body;
  let noteList = database.length.toString();
  newPost.id = noteList;
  database.push(newPost);
  fs.writeFileSync("./db/db.json", JSON.stringify(database));
  res.json(database);
});

//delete button
app.delete("/api/notes/:id", (req, res) => {
  let database = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newDatabase = database.filter((notes) => {
    return notes.id !== req.params.id;
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(newDatabase));
  res.json(newDatabase);
});

//callback for running app
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);