var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3330;

//tell express where our static files are (js, images,)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port! ${port}`);
});

io.attach(server);

//socket.io chap app stuff to follow

io.on('connection', function(socket) { //this is the switchboard operator - it manages everything 
    console.log('a user has connected', socket); //this socket knows what connection it has to manage and is storing this
   
    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'} ); //sending back a message to the machine thats connecting

    socket.on('chat message', function(msg) { //when you hit submit - it passes through this chat message
        console.log('message: ', msg, 'socket:', socket.id);

        io.emit('chat message', { id: `${socket.id}`, message: msg }); //emiting another message here
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
})
