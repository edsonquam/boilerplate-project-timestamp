// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Single endpoint - NO MIDDLEWARE needed
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  
  // Handle empty parameter (Requirements 7 & 8)
  if (!dateString) {
    const current = new Date();
    return res.json({
      unix: current.getTime(),    // Requirement 7
      utc: current.toUTCString()  // Requirement 8
    });
  }
  
  let date;
  
  // Check if it's a Unix timestamp (all digits)
  if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }
  
  // Check if date is invalid (Requirement 6)
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });  // Requirement 6
  }
  
  // Valid date response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
