const express = require("express");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World 123123");
});

app.listen(port, () => {
  console.log("Server is running in port: ", port);
});
