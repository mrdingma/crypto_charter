const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");

const config = require("./config");

const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/btc/hour", (req, res) => {
  axios
    .get(`${config.cryptoDB.dsn}/btc/hour`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/btc/day", (req, res) => {
  axios
    .get(`${config.cryptoDB.dsn}/btc/day`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(PORT, () => console.log("Listening on port: " + PORT));
