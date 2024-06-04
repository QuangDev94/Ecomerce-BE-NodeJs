const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World 123123");
});

mongoose
  .connect(
    `mongodb+srv://ngquangcodernew:${process.env.MONGO_DB}@cluster0.kqjumls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: ", port);
});
