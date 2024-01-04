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
