const express = require('express');

const app = express();

app.get('/', function(req, res){
  res.send('Hola');
})

app.listen(8080, function(){
  console.log('Run server');
})
