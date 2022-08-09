const http = require('http');
const app = require('./app');
const { connect } = require("./db/connect");

require('dotenv/config');

const normalizePort = val => {
   const port = parseInt(val, 10);

   if (isNaN(port)) {
      return val;
   }
   if (port >= 0) {
      return port;
   }
   return false;
};

const ID = process.env.ID || 'root';
const PASSWORD = process.env.PASSWORD || 'root';
const HOST = process.env.HOST || 'project.mongodb.net';
const COLLECTION = process.env.COLLECTION || 'hot-takes';

const URI = process.env.MONGO_URI
   .replace("<ID>", ID)
   .replace("<PASSWORD>", PASSWORD)
   .replace("<HOST>", HOST)
   .replace("<COLLECTION>", COLLECTION)
   || 'mongodb://localhost:27017/hot-takes';

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const errorHandler = error => {
   if (error.syscall !== 'listen') {
      throw error;
   }
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges.');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use.');
         process.exit(1);
         break;
      default:
         throw error;
   }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
   console.log('Listening on ' + bind);

   connect(URI, (err) => {
      if (err) {
         process.exit(-1);
      }
   });
});

server.listen(port);
