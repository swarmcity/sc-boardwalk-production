var HashtagRegistry = artifacts.require("HashtagRegistry");

contract('HashtagRegistry', function(accounts) {
    it("Should be owned.", function() {
      return HashtagRegistry.deployed().then(function(instance) {
          return instance.owner.call();
      }).then(function(owner) {
          assert.equal(owner, accounts[0], "wrong owner");
      });
    });

});
