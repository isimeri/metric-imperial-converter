'use strict';

const express = require('express');
// const bodyParser  = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const convertHandl = require('./controllers/convertHandler.js');
const convertHandler = new convertHandl;

let app = express();

//=================================================
// const regex = /^((?:[0-9]*)(?:\.\d+)?)(mi|km|gal|l)$/;
//=================================================

app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' })); //For FCC testing purposes only

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  // const data = str.match(regex);
  // res.json({count: data[1], unit: data[2]});
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  const resObj = { initNum, initUnit, returnNum, returnUnit, string: responseString };
  // console.log("in get ", input)
  // console.log(res);
  if (initNum === 'invalid number' || initUnit === 'invalid unit') {
    return res.send(responseString);
  }
  res.json(resObj);
  //{"initNum":4,"initUnit":"km","returnNum":2.48549,"returnUnit":"mi","string":"4 kilometers converts to 2.48549 miles"}
});
app.post('/api/convert', (req, res) => {
  const input = req.body.input;
  console.log("in post ", input);
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  if (initNum === 'invalid number' || initUnit === 'invalid unit') {
    return res.send(responseString);
  }
  const resObj = { initNum, initUnit, returnNum, returnUnit, string: responseString };
  // console.log(resObj);

  res.send(resObj);
});
//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
// apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// const port = process.env.PORT || 3000;
const port = 3000;

//Start our server and tests!
app.listen(port, function() {
  console.log("Listening on port " + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function() {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 5500);
  }
});

module.exports = app; //for testing