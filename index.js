const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const db = require("./db.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8000;

//api
app.get("/", (req, res) => {
  res.send("server is running");
});

const userRoute = require("./routes/userRouter.js");
const productRoute = require("./routes/productRouter.js");

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(PORT, () => console.log("server is running at port : " + PORT));
