import express from 'express';
import next from 'next';
import open from 'open'; // Import the 'open' package

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost'; // Default to 'localhost' if HOST is not defined

    server.listen(port, host, (err) => {
        if (err) throw err;

        console.log(`> Ready on http://${host}:${port}`);

        // Automatically open the app in the default browser in production mode
        if (!dev) {
            open(`http://${host}:${port}`)
                .then(() => console.log(`Browser opened at http://${host}:${port}`))
                .catch((error) =>
                    console.error(`Failed to open browser: ${error.message}`)
                );
        }
    });
});
