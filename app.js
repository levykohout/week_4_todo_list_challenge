var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var todoRouter = require('./routes/todo');
var completedRouter = require('./routes/complete');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/todo', todoRouter);
app.use('/complete',completedRouter);

// serve the index page at /
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
