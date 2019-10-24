const express = require('express');
const app = express();
const portNo = 3000;

app.get('/', (req, res) => res.json({ message: `api running on port ${portNo}.` }));

app.listen(portNo, () => console.log(`api started at http://localhost:${portNo}.`));
