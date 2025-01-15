const seed = require('./seed.js');
const { devData } = require('../test_data/index.js');
const db = require('../connection.js');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();