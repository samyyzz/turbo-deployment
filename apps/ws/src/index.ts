import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
  console.log("User connected");
  ws.on("message", async (msg) => {
    const parsedMsg = JSON.parse(msg.toString());
    ws.send(parsedMsg);
  });
  ws.on("error", (error) => {
    console.error(error);
  });
});

console.log('ws server started on : ws://localhost:8080');
