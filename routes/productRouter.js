const express = require("express");

const router = express.Router();

const productModel = require("../model/newProduct.js");

router.post("/add", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body);
  const dataSave = await data.save();
  res.status(200).json({
    success: true,
    message: "Product Uploaded Sucessfully....",
  });
});

router.get("/viewall", async (req, res) => {
  const items = await productModel.find({});
  res.send(JSON.stringify(items));
});

module.exports = router;
