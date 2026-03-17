const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(__dirname));

let players = {};

io.on("connection", (socket) => {
console.log("Player joined:", socket.id);

```
players[socket.id] = { x: 100, y: 100 };

socket.emit("currentPlayers", players);

socket.broadcast.emit("newPlayer", {
    id: socket.id,
    x: 100,
    y: 100
});

socket.on("move", (data) => {
    if (players[socket.id]) {
        players[socket.id] = data;
    }
    io.emit("updatePlayers", players);
});

socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("updatePlayers", players);
});
```

});

server.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});
