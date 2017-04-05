const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const jsonRoutes = require('./routes/JSON');
const resetRoutes = require('./routes/reset');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/JSON', jsonRoutes);
app.use('/reset', resetRoutes);

app.listen(process.env.PORT || 3000);
