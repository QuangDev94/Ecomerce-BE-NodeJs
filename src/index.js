const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("../src/routes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

dotenv.config();

app.use(bodyParser.json());

routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: ", port);
});
