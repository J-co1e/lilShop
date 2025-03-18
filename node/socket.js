// websocket.js
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 81 });

server.on("open", function open() {
  console.log("connected");
});

server.on("close", function close() {
  console.log("disconnected");
});
server.on("connection", function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;
  const clientName = ip + port;

  console.log("%s is connected ", clientName);
  const obj = {
    type: "normal",
    message: "Welcome" + clientName,
  };
  ws.send(JSON.stringify(obj));

  ws.on("message", function incoming(message) {
    console.log("received: %s from %s", message, clientName);
    // server.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(clientName + " -> " + message);
    //   }
    // });
  });
  ws.onclose = function () {
    console.log("%s is disconnected ", clientName);
  };
});

module.exports = server;
