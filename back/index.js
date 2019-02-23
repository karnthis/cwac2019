const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const PG = require('pg')
const Passport = require('passport')

let count = 0

/**
 * get logger
 * 1: console + file
 * 2: file
 * 3: error
 */
// const Logs = require('./libs/logger')

// todo import models

// import .env file
// require('dotenv').config();

// set up express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// GET paths
app.get('/', (req, res) => {
	count += 1
	res.send(`I have been visited ${count} times!`)
})

// POST paths

// Functions

// Start server
let port = process.env.PROD_PORT || 51515;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});