var ARCToken = artifacts.require("ARCToken");

contract('ARCToken', function(accounts) {
    it("should have initial price 125.", function() {
      return ARCToken.deployed().then(function(instance) {
          return instance.price.call();
      }).then(function(price) {
          assert.equal(price.toNumber(), 125, "token price incorrect");
      });
    });
    it("should have the same test balance.", function(done) {
        ARCToken.deployed().then(function(instance) {
            return instance.balanceOf.call(accounts[0]).then(function(balance) {
                assert.equal(balance.valueOf(), 1000000 * 1e18, "account not correct amount");
                done();
            });
        });
    });
    it("should have reward addresses defined.", function(done) {
        ARCToken.deployed().then(function(instance) {
            return instance.rewardAddressesSet.call(accounts[0]).then(function(addressesSet) {
                assert.equal(addressesSet.valueOf(), true, "reward addresses should be set");
                done();
            });
        });
    });

});
