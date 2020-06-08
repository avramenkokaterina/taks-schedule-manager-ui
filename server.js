const express = require('express');
const proxy = require('http-proxy-middleware').createProxyMiddleware;

const apiProxy = proxy('/api',
    {
        target: 'https://task-schedule-manager.herokuapp.com',
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
    });

const app = express();

app.use(apiProxy);

app.use(express.static('./dist/task-schedule-manager'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/task-schedule-manager/'}),
);

app.listen(process.env.PORT || 8080);
