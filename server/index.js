const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");
const nftRoutes = require("./routes/nft");
const express = require("express");
const app = express();
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/nft", nftRoutes);

app.listen(8080);
