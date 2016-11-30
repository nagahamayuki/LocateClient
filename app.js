var http = require("http");
var fs = require("fs");

var server = http.createServer();
server.on("request", function(req, res){
  fs.readFile("./index.html", "UTF-8", function(err, data){
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  });
}).listen(process.env.PORT || 8080);
console.log("server on :8080 ブラウザを表示しなければ動かない");

var socket = require('socket.io-client')('https://nodelocates.herokuapp.com/');
//var socket = require('socket.io-client')('http://localhost:8000');

var name = "長浜";
var id = 12345;
socket.on('connect', function(){
  console.log("接続できました");
  socket.emit('setStart', { name: name, id: id });
});
/* （１）↑ここまででsocket.io client でのデバイス接続 */

var io = require("socket.io")(server);
io.on("connection", function(client){

  client.on("Geolocate", function(data){
    console.log(data);
    socket.emit("panMaps", data);
  });
  /* （４）↑ 位置情報を受け取る */

});
