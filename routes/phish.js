const API_KEY = process.env.PHISH_DOT_NET_KEY;
const express = require('express');
// Request module is needed to make a request to a web service
const request = require('request');
var router = express.Router();

router.get('/blog/get', (req, res) => {
    let url = `https://api.phish.net/v3/blog/get?apikey=${API_KEY}`;

    // Find the query string (parameters) sent to this end point and pass them on to phish.net api call
    let n = req.originalUrl.indexOf('?') + 1;
    if (n > 0) {
        url += '&' + req.originalUrl.substring(n);
    }

    // When this web service gets a request, make a request to the Phish Web service
    request(url, function(error, response, body) {
        if (error) {
            res.send(error);
        } else {
            // Pass on everything (try out each of these in Postman to see the difference)
            // res.send(error);
            // res.send(response);
            res.sen(body);
        }
    })
})

router.get('/setlists/recent', (req, res) => {
    // Todo: the assignent part
})

module.exports = router;