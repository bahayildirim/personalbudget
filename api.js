const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Returns the first envelope with given category
function findEnvelope(category) {
    if (category) {
        const envelope = envelopes.find((element) => (element.category) === category);
        return envelope
    } else {
        return undefined;
    }
}

let envelopes = [];

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})

app.post("/envelopes", (req, res) => {
    const category = req.body.category;
    const budget = req.body.budget;
    if (category && budget) {
        envelopes.push(req.body);
        res.status(201).send("Envelope created");
    } else {
        res.status(400).send("Could not create envelope");
    }
})

app.get("/envelopes", (req, res) => {
    res.json(envelopes);
})

app.get("/envelopes/:category", (req, res) => {
    const envelope = findEnvelope(req.params.category);
    if (envelope) {
        res.send(envelope)
    } else {
        res.status(404).send("Envelope not found");
    }

})

app.put("/envelopes/:category", (req, res) => {
    const envelope = findEnvelope(req.params.category);
    if (envelope) {
        const index = envelopes.indexOf(envelope);
        const newVal = {
            "category": req.body.category,
            "budget": req.body.budget
        }
        envelopes[index] = newVal;
        res.send(`Envelope changed to:\n${JSON.stringify(envelopes[index])}`);
    } else {
        res.status(404).send("Envelope not found");
    }
})

app.delete("/envelopes/:category", (req, res) => {
    const envelope = findEnvelope(req.params.category);
    if (envelope) {
        const index = envelopes.indexOf(envelope);
        envelopes.splice(index, 1)
        res.status(200).send("Envelope deleted")
    } else {
        res.status(404).send("Envelope not found");
    }

})

app.put("/envelopes/:from/:to", (req, res) => {
    const from = findEnvelope(req.params.from);
    const to = findEnvelope(req.params.to);
    const amount = req.body.amount
    if (from && to && amount) {
        const fromIndex = envelopes.indexOf(from);
        const toIndex = envelopes.indexOf(to);
        envelopes[fromIndex].budget -= amount;
        envelopes[toIndex].budget += amount;
        res.status(200).send(`$${amount} transferred from ${from.category} to ${to.category}`);
    } else {
        res.status(404).send("Envelopes or amount not found");
    }

})