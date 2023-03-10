const server = require("http").Server(require("express"));
const io = require("socket.io")(server);
const port = process.env.WEBRTC_PORT;
var players = [];

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

io.on('connection', function (socket) {
  if (players.length == 0) socket.emit('host')
  console.log("Player Connected!!");
  socket.emit('socketID', { id: socket.id });
  socket.emit('getPlayers', players);

  socket.broadcast.emit('newPlayer', { id: socket.id });

  socket.on('playerMoved', function (data) {
    data.id = socket.id;
    socket.broadcast.emit('playerMoved', data);
    players.forEach(player => {
      if (player.id == data.id) {
        player.x = data.x;
        player.y = data.y;
        player.hp = data.hp;
      }
    })
  });

  socket.on('mobMoved', function (data) {
    socket.broadcast.emit('mobMoved', data);
  });

  socket.on('updateMobs', function (data) {
    socket.broadcast.emit('getMobs', data);
  });

  socket.on('awakeMob', function (data) {
    socket.broadcast.emit('awakeMob', data);
  });

  socket.on('updateSpells', function (data) {
    socket.broadcast.emit('getSpells', data);
  });

  socket.on('disconnect', function () {
    console.log("Player Disconnected");
    socket.broadcast.emit('playerDisconnected', { id: socket.id });
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == socket.id) {
        players.splice(i, 1);
      }

    }
  });
  players.push(new player(socket.id, 0, 0, 0));
});

function player(id, x, y, hp) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.hp = hp;
}