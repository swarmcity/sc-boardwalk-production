var HashtagRegistry = artifacts.require("HashtagRegistry");

contract('HashtagRegistry', function(accounts) {
    it("Should be owned.", function() {
      // return HashtagRegistry.deployed().then(function(instance) {
      //     return instance.price.call();
      // }).then(function(price) {
      //     assert.equal(price.toNumber(), 125, "token price incorrect");
      // });
    });
    it("be able to register a new hashtag.", function(done) {
        // HashtagRegistry.deployed().then(function(instance) {
        //     return instance.balanceOf.call(accounts[0]).then(function(balance) {
        //         assert.equal(balance.valueOf(), 1000000 * 1e18, "account not correct amount");
        //         done();
        //     });
        // });
    });
    it("owner should be able to change the ipfs hash.", function(done) {
        // HashtagRegistry.deployed().then(function(instance) {
        //     return instance.balanceOf.call(accounts[0]).then(function(balance) {
        //         assert.equal(balance.valueOf(), 1000000 * 1e18, "account not correct amount");
        //         done();
        //     });
        // });
    });

});
