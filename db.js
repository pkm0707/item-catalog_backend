const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const url = `${process.env.dburl}/${process.env.dbname}`;

mongoose
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

module.exports = mongoose;
