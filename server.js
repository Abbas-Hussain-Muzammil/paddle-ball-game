const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const server = new WebSocket.Server({ port });


let players = [];
server.on('connection', (socket) => {
    players.push(socket);
    
    socket.on('message', (message) => {
        players.forEach(player => {
            if (player !== socket) {
                player.send(message);  // Send message to the other player
            }
        });
    });

    socket.on('close', () => {
        players = players.filter(player => player !== socket);
    });
});

console.log('WebSocket server running on ws://localhost:8080');
