const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});*/

const cors = require('cors');

// Enable CORS for your React app only
app.use(cors({
  origin: 'http://localhost:3001' // Allow requests from this origin
}));

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.use(express.static('client/'));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(8080, () => {
  console.log('listening on *:8080');
});