
const http = require('http');

const DbContext = require('./layers/dataAccess/DbContext');

const {
  port
} = require('./config');

DbContext.connect().catch((e) => {
  throw (e);
})

const app = require('./createServer');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Serever is listening on port ${port}`);
})