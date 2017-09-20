var HashtagList = artifacts.require("HashtagList");

module.exports = function(deployer, network, accounts) {

    var hashtagList;
    deployer.then(function() {
        return deployer.deploy(HashtagList);
    }).then(function() {
        return HashtagList.deployed();
    }).then(function(tagList) {
        hashtagList = tagList;
    }).catch(function(e) {
        console.log(e);
    });
};
