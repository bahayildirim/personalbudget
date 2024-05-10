const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let envelopes = [];

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Hello, World");
})

app.post("/envelopes", (req, res) => {
    const category = req.body.category;
    const budget = req.body.budget;
    if(category && budget) {
        envelopes.push(req.body);
        res.status(201).send("Envelope created");
    } else {
        res.status(400).send("Could not create envelope");
    }
})

app.get("/envelopes", (req, res) => {
    res.json(envelopes);
})