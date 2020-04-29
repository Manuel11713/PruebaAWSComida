const express = require('express');
const app = express();



app.use(require('./signUp'));
app.use(require('./login'));

module.exports = app;