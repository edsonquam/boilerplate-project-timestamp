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

app.use("/api/:date?",(req,res,next)=>{
  let {date} = req.params
  let dateFormat = new Date(date)
  let dateObject = new Date(parseInt(date))
  let dateUnix = dateFormat.getTime()
  let dateUtc = dateFormat.toUTCString()


  if ( !date ) {
    let currentDate = new Date()
    let currentUnix = currentDate.getTime()
    let currentUtc = currentDate.toUTCString()
    return res.json({unix : currentUnix, utc : currentUtc})
  }

//Number(date).length !== 10 || Number(date).length !== 13
if (/^\d+$/.test(date)){
      if (date.length === 10 || date.length === 13){
      return next()}
      else {
        return res.json({error : "Invalide Date"})
      }}

if (!isNaN(dateUnix)){
        console.log(dateUnix)
          return next()
        }

  })


// your first API endpoint... 
app.get("/api/:date?", (req, res)=> {
  let {date} = req.params;
  let dateFormat = new Date(date);
  let dateUnix = dateFormat.getTime();
  let dateUtc = dateFormat.toUTCString();
  if (!isNaN(Number(date)) && date.trim() !== "" && date.length === 10 ||
date.length === 13
) {
  let dateObject = new Date(parseInt(date));
  let dateUtc = dateObject.toUTCString();
  return res.json({ unix: Number(date), utc: dateUtc});
}
res.json({ unix: dateUnix, utc: dateUtc});
  
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
