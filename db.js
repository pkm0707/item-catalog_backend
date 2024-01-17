const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const url = `mongodb+srv://karthick18696:Ayyammal1@cluster0.bwkbmts.mongodb.net/${process.env.dbname}`;

mongoose
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

module.exports = mongoose;
