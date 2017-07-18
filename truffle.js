require('babel-register');
require('babel-polyfill');
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      gas: 4710000,
      network_id: "3"
    },
    kovan: {
      host: "localhost",
      port: 8545,
      gas: 2710000,
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      gas: 4710000,
      network_id: "4"
    },
  }
};
