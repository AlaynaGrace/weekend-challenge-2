//requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require( 'path' );

//global(s)
var total = 0;

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

//create server at port 3000
app.listen( 3000, function(){
  console.log( 'server up on:', 3000 );
});

//take in the info from the client
app.post('/math',function(req,res){
  console.log('/math POST');
  var data = req.body;
  var first = parseInt(data.first);
  var second = parseInt(data.second);
  //data being sent has keys: first, second, and op
  //take in what the operation is and then perform that operation on given #s
  switch (data.op) {
    case '+':
      total = first + second;
      break;
    case '-':
      total = first - second;
      break;
    case 'x':
      total = first * second;
      break;
    case '÷':
      total = first / second;
      break;
  }
  res.status(200);
});

//sends the total
app.get('/math', function(req,res){
  console.log('/math GET');
  res.send({answer: total});
});
