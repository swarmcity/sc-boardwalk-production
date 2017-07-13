var ARCToken = artifacts.require("ARCToken");
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var MiniMeToken = artifacts.require("MiniMeToken");
var SWTConverter = artifacts.require("SWTConverter");
var SampleController = artifacts.require("SampleController");
var Hashtag = artifacts.require("Hashtag");
var DealForTwoFactory = artifacts.require("DealForTwoFactory");

module.exports = function(deployer, network, accounts) {
    var multisig 	= accounts[0];
    var startBlock 	= web3.eth.blockNumber;
    var endBlock;

    var founder		= accounts[1];
    var developer 	= accounts[1];
    var rewards 	= accounts[1];

    var hashtagName = "TestnetHashtag";
    var hashtagCommission = 10000000000000000;
    var metadataHash = "QmXNNWiSKCpwH3241VDixSG189NmMWXPppiZLgDmfZ3Cih";

    if (network != "development") {
        endBlock = startBlock + 100;
    } else {
        endBlock = startBlock * 2;
    }

    var swtFactory, swtToken, swtController, testHashtag;
    deployer.then(function() {
        return deployer.deploy(ARCToken, multisig, startBlock, endBlock);
    }).then(function() {
        return ARCToken.deployed();
    }).then(function(arcTokenInstance) {
        return arcTokenInstance.setRewardAddresses(founder, developer, rewards, {from: multisig});
    }).then(function() {
        return deployer.deploy(MiniMeTokenFactory);
    }).then(function() {
        return MiniMeTokenFactory.deployed();
    }).then(function(tokenFactory) {
        swtFactory = tokenFactory;
        return deployer.deploy(MiniMeToken,
            swtFactory.address,
            0,
            web3.eth.blockNumber,
            "Swarm City Token",
            18,
            "SWT",
            true);
    }).then(function() {
        return MiniMeToken.deployed();
    }).then(function(token) {
        swtToken = token;
        return deployer.deploy(SWTConverter, swtToken.address, swtFactory.address);
    }).then(function() {
        return deployer.deploy(SampleController, swtToken.address);
    }).then(function() {
        return SampleController.deployed();
    }).then(function(controller) {
        swtController = controller;
        return deployer.deploy(Hashtag,
            swtToken.address,
            swtFactory.address,
            hashtagName,
            hashtagCommission,
            metadataHash
        );
    }).then(function() {
        return Hashtag.deployed();
    }).then(function(hashtag) {
        testHashtag = hashtag;
        return deployer.deploy(DealForTwoFactory, testHashtag.address);
    }).catch(function(e) {
        console.log(e);
        return;
    });
};
