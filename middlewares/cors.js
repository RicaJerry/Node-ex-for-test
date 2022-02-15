const cors = (app) => {
  const baseHeaders = [
    'Origin',
    'Authorization',
    'Accept',
    'Content-Type'
  ]
  const allowedHeaders = baseHeaders;
  app.use((req, res, next) => {
    const origin = req.get('Origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, PATCH, POST, DELETE'
    );
    res.header('Access-Control-Allow-Headers', allowedHeaders.join());
    res.header('Access-Control-Expose-Headers', allowedHeaders.join());
    next();
  });
};

module.exports = cors;