var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3030;

//tell express where our static files are (js, images,)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(_dirname + '/views/index.html');
});

http.listen(port, () => {
    console.log(`app is running on port ${port}`);
});