import express from 'express';
import next from 'next';
import open from 'open';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = new SocketIOServer(httpServer);

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';

    httpServer.listen(port, host, (err) => {
        if (err) {
            console.error('Failed to start server:', err);
            process.exit(1);
        }

        console.log(`> Ready on http://${host}:${port}`);

        if (!dev) {
            open(`http://${host}:${port}`)
                .then(() => console.log(`Browser opened at http://${host}:${port}`))
                .catch((error) =>
                    console.error(`Failed to open browser: ${error.message}`)
                );
        }
    });
}).catch((err) => {
    console.error('Failed to prepare app:', err);
    process.exit(1);
});