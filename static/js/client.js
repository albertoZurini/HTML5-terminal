$(document).ready(() => {
  // Connect to the socket.io server
  var socket = io.connect('https://localhost:8080');
  var term = new Terminal();
  term.open(document.getElementById('terminal'));
  // Wait for data from the server
  socket.on('output', function (data) {
    // Insert some line breaks where they belong
    //console.log(data.indexOf('\n'));
    //data = data.replace("\n", "<br/>");
    //data = data.replace("r", "");
    // Append the data to our terminal
    term.write(data);
    //$('.terminal').append(data);
  });
  // Listen for user input and pass it to the server
  /*
  $(document).on("keypress",function(e){
    var char = String.fromCharCode(e.which);
    socket.emit("input", char);
  });*/

  term.on('key', (key, ev) => {
    var char = String.fromCharCode(key.charCodeAt(0));
    socket.emit('input', char);
  });
});