var ARCToken = artifacts.require("ARCToken");
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var MiniMeToken = artifacts.require("MiniMeToken");
var SWTConverter = artifacts.require("SWTConverter");

module.exports = function(deployer, network, accounts) {
    ARCToken.deployed().then(function(arcToken) {
        deployer.then(function() {
            return MiniMeTokenFactory.new();
        }).then(function(instance) {
            factory = instance;
            return MiniMeToken.new(factory.address,
                "0x0",
                web3.eth.blockNumber,
                "Swarm City Token",
                18,
                "SWT");
        }).then(function(tokenInstance) {
            return SWTConverter.new(tokenInstance.address, arcToken.address)
        }).catch(function(e) {
            console.error(JSON.stringify(e));
        });
    });
};