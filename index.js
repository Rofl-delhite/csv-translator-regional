const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "demo.html"));
});
app.get("/doc", (req, res) => {
  res.sendFile(path.join(__dirname, "doc.html"));
});
app.listen(process.env.PORT || port, () => {
  console.log("http://localhost:3000");
});
