const express = require("express");
const app = express();
const PORT = 3000;

// Listener
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Hello, World");
})