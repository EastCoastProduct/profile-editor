'use strict';

const path = require('path');

const express = require('express');

const port = process.env.PORT || 3000;
const staticDir = path.join(__dirname, 'dist');
const staticIndex = path.join(staticDir, 'index.html');
const app = express();

app.use(express.static(staticDir));

app.all('/*', (req, res) => {
  res.sendFile(staticIndex);
});

app.listen(port, (err) => {
  if (err) {
    console.err(err);
  }

  console.log(`Listening on port ${port}`);
});
