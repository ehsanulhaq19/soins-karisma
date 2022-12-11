const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const db = require('./database')
const routes = require('./src/routes');

const app = express();

var corsOptions = {
	origin: "http://localhost:8000/"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//api routes
app.use('/api', routes);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log (`Server is running on port ${PORT}.`);
});