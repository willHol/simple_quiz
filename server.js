// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Routes
var jsonRoutes = require('./routes/JSON');
var resetRoutes = require('./routes/reset');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/JSON', jsonRoutes);
app.use('/reset', resetRoutes);

app.listen(process.env.PORT || 3000);