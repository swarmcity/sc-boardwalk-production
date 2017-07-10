var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var MiniMeToken = artifacts.require("MiniMeToken");

module.exports = function(deployer, network, accounts) {
    var factory;

    deployer.then(function() {
        return MiniMeTokenFactory.new();
    }).then(function(instance) {
        factory = instance;
        return MiniMeToken.new(factory.address,
            "0x0",
            web3.eth.blockNumber,
            "Swarm City Token",
            18,
            "SWT",
            true, {
                gas: 4710000
            });
    }).then(function() {

    });
    console.log("done");
};