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
/* リモートとローカルの変更箇所 */

socket.on('connect', function(){
  console.log("基Nodeとの接続が完了しました。");
});
/* （１）↑ここまででsocket.io client でのデバイス接続 */

var io = require("socket.io")(server);
io.on("connection", function(client){

  client.on("frontSet", function(data){
    socket.emit("setStart", data);
  });

  client.on("Geolocate", function(data){
    socket.emit("panMaps", data);
  });
  /* （４）↑ 位置情報を受け取る */

  client.on('disconnect', function(){
    socket.emit('setStart', false);
  });

});
