// Express is the framework we're going to use to handle requests
const express = require('express');

// retrieve the router object from express
var router = express.Router();

// Add a get route to the router
router.get("/", (req, res) => {
    res.send({
        message:"Hello, you set a GET request"
    })
})

// Add a post route to the router
router.post("/", (req, res) => {
    res.send({
        message:"Hello, you sent a POST request"
    })
})

// "return" the router
module.exports = router;