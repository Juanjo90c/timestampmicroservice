var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function(req, res){
  let urlDate = req.params.date == undefined ?
    Date.now():
    req.params.date
  let date =  isNaN(Number(urlDate))? 
    new Date(urlDate) :
    new Date(Number(urlDate))
  if(date == "Invalid Date")
  {
    res.json(
      { error : "Invalid Date" }
    )
  }
  else 
  {
    res.json({
      "unix": date.valueOf(),
      "utc": date.toUTCString()
    })
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
