var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3030;

//tell express where our static files are (js, images,)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

io.on('connection', function(socket) {
    console.log('a user has connected');

    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'} );

    // listen for an incoming message from anyone connected to the app
    socket.on('chat message', function(msg) {
        console.log('message: ', msg, 'socket:', socket.id);

        // send the message to everyone connected to the app
        io.emit('chat message', { id: `${socket.id}`, message: msg });
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
});