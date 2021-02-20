const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
module.exports = app;

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
const port = 8780;
const server = app.listen(port, async () => {
    console.log("running on localhost: " + port);
});

let projectData = {};

app.get("/all", getData);
function getData(req, res) {
    res.send(projectData);
}

//post route
app.post("/add", postData);
function postData(req, res) {
    projectData["city"] = req.body.city;
    projectData["country"] = req.body.country;
    projectData["temp"] = req.body.temp;
    projectData["flag"] = req.body.flag;
    projectData["curr"] = req.body.curr;
    projectData["language"] = req.body.language;
    projectData["Image"] = req.body.Image;
    projectData["symbol"] = req.body.symbol;
    res.send(projectData);
}
