const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Folder untuk file frontend

// Ketika user terhubung ke server
io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    // Menerima pesan dari user dan mem-broadcast ke semua user
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});