require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api', (req, res) => {
  res.send('Hello World from API!')
})

app.get('/api/test', (req, res) => {
  const sampleData = {
    text: 'You are connected to the backend! ✅',
    randomData: Math.random(),
  };
  res.send(sampleData);
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const { Server } = require("socket.io");
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
});
