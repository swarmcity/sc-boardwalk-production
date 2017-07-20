var HashtagRegistry = artifacts.require("HashtagRegistry");
const bs58 = require('bs58')

// var formatInputBytes = function(value) {
//     if (Buffer.isBuffer(value)) {
//         return new SolidityParam(value.toString("hex"));
//     }
//     var result = utils.toHex(value).substr(2);
//     var l = Math.floor((result.length + 63) / 64);
//     result = utils.padRight(result, l * 64);
//     return new SolidityParam(result);
// };

// const toIPFSHash = str => {
//     // remove leading 0x
//     const remove0x = str.slice(2, str.length);
//     // add back the multihash id
//     const bytes = Buffer.from(`1220${remove0x}`, "hex");
//     const hash = bs58.encode(bytes);
//     return hash;
// };

contract('HashtagRegistry', function(accounts) {
    it("Should be owned.", function() {
      return HashtagRegistry.deployed().then(function(instance) {
          return instance.owner.call();
      }).then(function(owner) {
          assert.equal(owner, accounts[0], "wrong owner");
      });
    });
//     it("Should be able to add.", function() {
//         return HashtagRegistry.deployed().then(function(instance) {
//             //newHashtag(address _hashtag, bytes32 _ipfsHash)
//             const bytes = bs58.decode(hash);
//             const multiHashId = 2;
//
//             return instance.newHashtag.call(accounts[0] + "", "QmXNNWiSKCpwH3241VDixSG189NmMWXPppiZLgDmfZ3Cih");
//         }).then(function(tags) {
//             assert.equal(owner, accounts[0], "wrong owner");
//         });
//     });
//     it("Should be able to get.", function() {
//         return HashtagRegistry.deployed().then(function(instance) {
//             return instance.hashtags.call(accounts[0]);
//         }).then(function(tags) {
//             console.log(tags)
// //            assert.equal(owner, accounts[0], "wrong owner");
//         });
//     });

});
