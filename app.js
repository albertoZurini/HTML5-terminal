var express = require('express');
var fs = require('fs');
var pty = require('pty.js');

const USE_SSL = true; // HTTPS/HTTP
const PORT = 8080;

var app = express(); // setup express
app.use("/",express.static("./static")); // serve static

if(USE_SSL){
  var https = require('https');

  var options = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
  };

  var server = https.createServer(options, app).listen(PORT);
} else {
  var http = require('http');
  var server = http.createServer(app).listen(PORT);
}
console.log('Listening on poirt ', PORT);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('Client connected');
  
  // Create terminal
  var term = pty.spawn('bash', [], {
     name: 'xterm-color',
     cols: 80,
     rows: 30,
     cwd: process.env.HOME,
     env: process.env
  });

  // Send terminal data to client
  term.on('data', function(data){
     socket.emit('output', data);
  });

  // Listen on the client and send any input to the terminal
  socket.on('input', function(data){
     term.write(data);
  });
  
  // When socket disconnects, destroy the terminal
  socket.on("disconnect", function(){
     term.destroy();
     console.log("Client disconnected");
  });
});