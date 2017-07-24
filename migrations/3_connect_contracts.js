var ARCToken = artifacts.require("ARCToken");
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var MiniMeToken = artifacts.require("MiniMeToken");
var SWTConverter = artifacts.require("SWTConverter");
var SampleController = artifacts.require("SampleController");
var Hashtag = artifacts.require("Hashtag");
var DealForTwoFactory = artifacts.require("DealForTwoFactory");
var SimpleDealFactory = artifacts.require("SimpleDealFactory");

module.exports = function(deployer, network, accounts) {

    var swtToken, swtController, testHashtag, dealForTwoFactory, simpleDealFactory;

    deployer.then(function() {
        return MiniMeToken.deployed();
    }).then(function(token) {
        swtToken = token;
        return SampleController.deployed();
    }).then(function(controller) {
        swtController = controller;
        return Hashtag.deployed();
    }).then(function(hashtag) {
        testHashtag = hashtag;
        return DealForTwoFactory.deployed();
    }).then(function(factory) {
        dealForTwoFactory = factory;
        return SimpleDealFactory.deployed();
    }).then(function(factory) {
        simpleDealFactory = factory;
        return swtToken.changeController.call(swtController.address);
    }).then(function() {
        return testHashtag.addFactory.call(dealForTwoFactory.address);
    }).then(function() {
        return testHashtag.addFactory.call(simpleDealFactory.address);
    }).catch(function(e) {
        console.log(e);
        return;
    });
};
