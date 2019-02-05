const express = require('express');
const crypto = require('crypto');
let db = require('../utilities/util.js').db;
let getHash = require('../utilities/util.js').getHash;
let sendEmail = require('../utilities/util.js').sendEmail;
var router = express.Router();
const bodyParser = require('body-parser'); // This allows parsing of the body of POST requests that are encoded in JSON
router.use(bodyParser.json());

router.post('/', (req, res) => {
    res.type('application/json');
    
    // Retrieve data from query params
    var first = req.body['first'];
    var last = req.body['last'];
    var username = req.body['username'];
    var email = req.body['email'];
    var password = req.body['password'];

    // Verify that the caller supplied all the parameters in js.
    // Empty strings or null values evaluate to false.
    if (first && last && username && email && password) {
        // We are storing salted hashes to make our application more secure.
        // If you are interested as to what that is, and why we should use it, 
        // watch this youtube video: https://www.youtube.com/watch?v=8ZtInClXe1Q
        let salt = crypto.randomBytes(32).toString('hex');
        let salted_hash = getHash(password, salt);

        // Use .none() since no result gets returned from an INSERT in SQL
        // We are using placeholders ($1, $2, $3) in the SQL query string to avoid SQL Injection
        // If you want to read more: https://stackoverflow.com/a/8265319
        let params = [first, last, username, email, salted_hash, salt];
        db.none("INSERT INTO MEMBERS(FirstName, LastName, Username, Email, Password, Salt) VALUES ($1, $2, $3, $4, $5, $6)", params).then(() => {
            res.send({
                success:true
            })
            sendEmail('yyc8@uw.edu', email, 'Welcome!', '<strong>Welcome to our app!</strong>');
        }).catch((err) => {
            console.log(err);
            res.send({
                success:false,
                error:err, 
                message:'Account already exist.'
            })
        })
    } else {
        res.send({
            success:false,
            input:req.body,
            message:'Missing required user information.'
        })
    }
})

module.exports = router;
