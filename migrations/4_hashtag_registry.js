var HashtagList = artifacts.require("HashtagList");
var HashtagRegistry = artifacts.require("HashtagRegistry");

module.exports = function(deployer, network, accounts) {

    var hashtagRegistry, hashtagList;
    deployer.then(function() {
        return deployer.deploy(HashtagRegistry);
    }).then(function() {
        return deployer.deploy(HashtagList);
    }).then(function() {
        return HashtagList.deployed();
    }).then(function(tagList) {
        hashtagList = tagList;
    }).catch(function(e) {
        console.log(e);
    });
};
