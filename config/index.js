const getConfig = () => {
  const { NODE_ENV } = process.env;
  const isProd = NODE_ENV === 'production';
  const isTest = NODE_ENV === 'local';

  const config = {
    isProd,
    isTest,
    port: process.env.PORT || 3001,
    mongoUrl: process.env.MONGO_URL,
    mongoUrlTest: process.env.MONGO_URL_TEST,
  }
  return config;
}

module.exports = getConfig()