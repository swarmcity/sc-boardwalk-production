var HashtagList = artifacts.require("HashtagList");
var Hashtag = artifacts.require("Hashtag");

contract('HashtagRegistry', function(accounts) {
    it("Should be able to add and read back ipfs hash", function() {

        var ipfs = "QmYpW8LW7QmV8fUuiRGiXfXQTGGJ9mbpmkxt2Dhfcdt2DG";

        var ht, htList;
        Hashtag.deployed().then(function(instance) {
            ht = instance;
            return HashtagList.deployed();
        }).then(function(instance) {
            htList = instance;
            return htList.setBytes(ht.address, ipfs);
        }).then(function() {
            return htList.getMap(ht.address);
        }).then(function(str) {
            assert.equal(str, ipfs, "should read back same ipfs hash");
        }).catch(function(e) {
            console.log("error: " + e);
            assert.equal(e, null, "got error");
        });
    });

    it("Should fail if not given hashtag address", function() {

        var ipfs = "QmYpW8LW7QmV8fUuiRGiXfXQTGGJ9mbpmkxt2Dhfcdt2DG";

        var htList;
        HashtagList.deployed().then(function(instance) {
            htList = instance;
            return htReg.setBytes(htList.address, ipfs);
        }).catch(function(e) {
            assert.equal(e, "Error: VM Exception while processing transaction: invalid opcode", "got error");
        });
    });

});
