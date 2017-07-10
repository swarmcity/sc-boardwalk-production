var ARCToken = artifacts.require("ARCToken");

module.exports = function(deployer, network, accounts) {
    var multisig 	= accounts[0];
    var startBlock 	= web3.eth.blockNumber;
    var endBlock;

    var founder		= accounts[1];
    var developer 	= accounts[1];
    var rewards 	= accounts[1];

    if (network != "development") {
        endBlock = startBlock + 100;
    } else {
        endBlock = startBlock * 2;
    }

    deployer.then(function() {
        return ARCToken.new(multisig, startBlock, endBlock);
    }).then(function(instance) {
        return instance.setRewardAddresses(founder, developer, rewards, {from: multisig});
    }).catch(function(e) {
        console.error(e);
        return;
    });
};