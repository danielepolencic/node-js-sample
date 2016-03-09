var express = require('express');
var app = express();

var logger = function(request, response, next) {
    console.log("GOT REQUEST !");
    next(); // Passing the request to the next handler in the stack.
};

app.set('port', (process.env.PORT || 5000));
app.use(logger); // Here you add your logger to the stack.
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

process.on( "SIGINT", function() {
  console.log('CLOSING [SIGINT]');
  process.exit();
} );

process.on( "SIGTERM", function() {
  console.log('CLOSING [SIGTERM]');
  process.exit();
} );

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
