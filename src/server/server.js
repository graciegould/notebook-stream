import express from 'express';
import next from 'next';
import open from 'open';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';

    server.listen(port, host, (err) => {
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