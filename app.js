//var socket = require('socket.io-client')('https://nodelocates.herokuapp.com/');
var socket = require('socket.io-client')('http://localhost:8000');

var name = "長浜";
var id = 12345;
socket.on('connect', function(){
  console.log("接続できました");
  socket.emit('setStart', { name: name, id: id });
});
