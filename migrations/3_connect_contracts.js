var ARCToken = artifacts.require("ARCToken");
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var MiniMeToken = artifacts.require("MiniMeToken");
var SWTConverter = artifacts.require("SWTConverter");
var SampleController = artifacts.require("SampleController");
var Hashtag = artifacts.require("Hashtag");
var DealForTwoFactory = artifacts.require("DealForTwoFactory");

module.exports = function(deployer, network, accounts) {

    var swtToken, swtController, testHashtag, dealForTwoFactory;

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
        return swtToken.changeController.call(swtController.address);
    }).then(function() {
        return testHashtag.addFactory.call(dealForTwoFactory.address);
    }).catch(function(e) {
        console.log(e);
        return;
    });
};
