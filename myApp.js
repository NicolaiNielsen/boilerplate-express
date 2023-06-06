require('dotenv').config()
let bodyParser = require('body-parser')
let express = require('express');
let app = express();

console.log("Hello World")

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log(req.ip)
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
})

app.get('/now', (request, response, next) => {
  request.time = new Date().toString()
  next()
} , (request, response) => {
  response.json({'time': request.time})
})


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
    app.use(express.static(__dirname + "/public"));
  });

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
    console.log("wokr?")
  } else {
    response = "Hello json";
  }
  res.json({"message": response})
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word})
})

app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last})
})




































 module.exports = app;
