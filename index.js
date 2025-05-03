// index.js
// where your node app starts

// init projectg
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// 新增时间戳转换接口
app.get("/api/:date", function (req, res) {
  //solution 1:
  let dateParam = req.params.date;
  
  // 处理unix时间戳格式
  if (/^\d+$/.test(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);
  
  if (date.toString() === "Invalid Date") {
    return res.json({ error : "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });

  //solution 2:
  // let dateString = req.params.date;
  // //A 4 digit number is a valid ISO-8601 for the beginning of that year
  // //5 digits or more must be a unix time, until we reach a year 10,000 problem
  // if (/\d{5,}/.test(dateString)) {
  //   let dateInt = parseInt(dateString);
  //   //Date regards numbers as unix timestamps, strings are processed differently
  //   res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  // } else {
  //   let dateObject = new Date(dateString);

  //   if (dateObject.toString() === "Invalid Date") {
  //     res.json({ error: "Invalid Date" });
  //   } else {
  //     res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  //   }
  // }
});

// 处理空日期参数的情况
app.get("/api", function (req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
