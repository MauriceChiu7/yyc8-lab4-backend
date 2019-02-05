const express = require('express');

/* This has been handled by util.js
// pg-promise is a postgres library that uses javascript promises
const pgp = require('pg-promise')();

// we have to set ssl usage to true for heroku to accept our connection
pgp.pg.defaults.ssl = true;

// create connection to heroku database
let db;
// Uncomment next line and change the string to your DATABASE_URL ??? Not necessary cuz the URL has been saved in .env locally.
db = pgp(process.env.DATABASE_URL);

if (!db) {
    console.log("Database setup incorrectly");
    process.exit(1);
}
*/

// Create connection to heroku database
let db = require('../utilities/util.js').db;

var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", (req, res) => {
    var name = req.body['name'];

    if (name) {
        db.none("INSERT INTO DEMO(Text) VALUES ($1)", name).then(() => {
            res.send({
                success:true
            })
        }).catch((err) => {
            console.log(err);
            res.send({
                success:false,
                error:err
            })
        })
    } else {
        res.send({
            success:false,
            input:req.body,
            error:"Missing required information"
        })
    }
})

router.get("/", (req, res) => {
    db.manyOrNone("SELECT Text FROM Demo").then((data) => {
        res.send({
            success:true,
            names:data
        })
    }).catch((err) => {
        console.log(err);
        res.send({
            success:false,
            error:err
        })
    })
})

module.exports = router;