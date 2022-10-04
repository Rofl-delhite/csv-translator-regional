const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const { Translate } = require("@google-cloud/translate").v2;
const upload = require("express-fileupload");
const translate = new Translate();
app.use(upload());
const port = 3000;
let text = "";
const target = "en";
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "demo.html"));
});
app.post(`/save`, (req, res) => {
  const buff = req.files.file.data.toJSON().data;
  text = String.fromCharCode.apply(null, new Uint16Array(buff));
  translateText("en", res);
});
app.get("/doc", (req, res) => {
  res.sendFile(path.join(__dirname, "doc.html"));
});
app.get("/hindi", (req, res) => {
  const file = fs.readFileSync("en.csv", "utf8");
  text = file.toString();
  translateText("hi", res);
});
app.get("/punjabi", (req, res) => {
  const file = fs.readFileSync("en.csv", "utf8");
  text = file.toString();
  translateText("pa", res);
});
app.get("/marathi", (req, res) => {
  const file = fs.readFileSync("en.csv", "utf8");
  text = file.toString();
  translateText("mr", res);
});
app.get("/telugu", (req, res) => {
  const file = fs.readFileSync("en.csv", "utf8");
  text = file.toString();
  translateText("te", res);
});
app.listen(process.env.PORT || port, () => {
  console.log("http://localhost:3000");
});

async function translateText(tgt, res) {
  let [translations] = await translate.translate(text, tgt);
  translations = Array.isArray(translations) ? translations : [translations];

  let data = translations.toString();
  if (tgt === "en") {
    fs.writeFile(`${tgt}.csv`, data, (err) => {
      if (err) console.log(err);
    });
  } else {
    res.setHeader("Content-disposition", `attachment; filename=data${tgt}.csv`);
    res.set("Content-Type", "text/csv");
    res.status(200).send(data);
  }
}
