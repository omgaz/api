const routes = require('./routes');
const express = require('express');
const bodyParser = require('body-parser');

const portNo = process.env.NODE_ENV === 'production' ? 80 : 3000;
const app = express();

app.use(bodyParser.json());
app.use('/', routes);
app.get('/status', (req, res) => res.json({ status: 'OK' }));

app.listen(portNo, async () => {
  console.log(`Listening at http://localhost:${portNo}.`);
});
