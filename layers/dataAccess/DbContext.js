const mongoose = require('mongoose');
const { mongoUrl } = require('./../../config');

class DbContext {
  constructor() {
    this._isConnected = false;
    this._connection = null;
  }

  connect() {
    if(!this._isConnected) {
      mongoose.Promise = global.Promise;
      this._connection = mongoose.connection;
      return mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
      }).catch((err) => {
        throw err;
      })
    }
  }
}

module.exports = new DbContext();