var HashtagRegistry = artifacts.require("HashtagRegistry");

module.exports = function(deployer, network, accounts) {

    deployer.then(function() {
        return deployer.deploy(HashtagRegistry);
    }).catch(function(e) {
        console.log(e);
    });
};
