const express = require('express');
var router = express.Router();


const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", (req, res) => {
    setTimeout(() => {
        res.send({
            message:"Thanks for waiting"
        })
    }, 1000)
})

router.post("/", (req, res) => {
    setTimeout(() => {
        res.send({
            message:"Thanks for waiting. You sent a POST request"
        })
    }, 1000)
})

module.exports = router;


// app.get("/wait", (req, res) => {
//     setTimeout(() => {
//         res.send({
//             message: "Thanks for waiting"
//         });
//     }, 1000);
// });
    