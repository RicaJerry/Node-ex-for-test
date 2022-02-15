
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet') // For security of our request 

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'none'"]
  }
}))

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
const textParser = bodyParser.text();
const jsonParser = bodyParser.json({ limit: '10mb' });
const urlencodeParser = bodyParser.urlencoded({ extended: true });
[textParser, jsonParser, urlencodeParser].forEach((parser) => {
  app.use((req, res, next) => {
    if (!req.url.includes('file')) {
      return parser(req, res, next);
    }
    return next();
  });
});

require('./middlewares').cors(app);
require('./routers')(app);

module.exports = app;