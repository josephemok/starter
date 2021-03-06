// Node.js backend for the app
var express = require('express');

// TODO: wire the stats
var controller = require("./controller.js");

var app = express();
var port = 9000;
var static_dir = __dirname + "/../web";


//body parser next, so we have req.body
app.use(express.bodyParser());

// simple logger middleware
app.use(function(req, res, next) {
   console.log("Received %s %s:", req.method, req.url);
   if (req.method == "POST") console.log(req.body);
   if (req.query.length>0) console.log(req.query);
   next();
});

// static first, to ignore logging static requests
app.use(express.static(static_dir));

app.use(express.errorHandler({dumpExceptions: true }));

// REST controller mappings
// TODO: add YOUR stuff here
app.get('/data/:id/stuff', controller.getStuff);

app.listen(port);
console.log('Express listening on port ' + port);
console.log('Serving static content from: ' + static_dir);