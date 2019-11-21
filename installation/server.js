var fs = require('fs');
var data = fs.readFileSync('public/visualization/flowers-1.json');
var words = JSON.parse(data);

var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());
var server = app.listen(process.env.PORT || 4000);



app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);


function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    socket.on('flower', newFlower);

    function newFlower(data) {
        socket.broadcast.emit('flower',data);
       console.log(data);
words.flowers.push(data.petal);
       var data2 = JSON.stringify(words);
       fs.writeFile('public/visualization/flowers-1.json', data2, finished);
    
       function finished(err) {
                     //  console.log(data2);
                   }
    }

    
}

