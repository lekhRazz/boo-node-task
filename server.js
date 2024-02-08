import http from "http";

import app from "./app.js";

import config from "./lib/config/app.env.config.js";

//Create http server and load api-gateway
const server = http.createServer(app);
const port = config.service.port || 3000;

server.listen(port, () => {
  console.log(`server is running on port :: ${port} and process id is ${process.pid}`)
})


// Graceful shutdown of http server
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});