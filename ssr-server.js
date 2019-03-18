import ThriftService from './services/thrift';

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        let queryParams = { items: [] };

        server.on('mount', function() {
            console.log('Admin Mounted');
        });

        server.get('/about', async (req, res) => {
            const actualPage = '/about';
            const thrift = new ThriftService(
                '127.0.0.1',
                9090
            ).run();

            thrift._connection.client.news.getNews(
                async (err, { items }) => {
                    if (!err) {
                        queryParams = { items };
                        app.render(
                            req,
                            res,
                            actualPage,
                            queryParams
                        );

                        thrift.endConnection();
                    }
                }
            );
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
