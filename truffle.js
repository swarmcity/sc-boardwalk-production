require('babel-register');
require('babel-polyfill');
var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "";
var provider = new HDWalletProvider(mnemonic, "http://192.168.1.4:8545/");

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    ropsten: {
        provider: provider,
        network_id: 3 // official id of the ropsten network
    }
  }
};
