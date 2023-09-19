const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


app.get('/config', (req, res) => {
  res.send('Config lesen');
});

app.post('/config', (req, res) => {
  res.send('Config ändern');
});

app.post('/start', (req, res) => {
  res.send('Server starten');
});

app.post('/stop', (req, res) => {
  res.send('Server stoppen');
});
