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
    console.log('a user has connected');

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
})
