const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
  res.end('Connected to Server!');
});

const wss = new websocket.Server({server});

CLIENTS = [];

wss.on('connection', (ws, req) => {

  CLIENTS.push(ws);

  ws.on('message', (msg) => {
    sendAll(msg);
  });

}).on('close', function() {
  delete CLIENTS[ws];
});

sendAll = (msg) => {
  for (var i=0; i<CLIENTS.length; i++) {
    try {
      CLIENTS[i].send(msg);
    } catch (error) {
      console.log('Trying to send data to offline client. It\'s a bug my friend.');
    }
  }
}

server.listen(4000);
