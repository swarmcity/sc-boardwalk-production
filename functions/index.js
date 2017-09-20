const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');
const Web3 = require('web3');
const minime = require('./IMiniMeToken.json');

admin.initializeApp(functions.config().firebase);

/**
* @param {string} hashtag_name a budget you are willing to pay for for your request
* @param {string} last_deal a description of what you are requesting
* @param {string} deals a description of what you are requesting
* @param {string} last_deal a description of what you are requesting
* @param {string} description a description of what you are requesting
* @param {string} maintainer a description of what you are requesting
* @param {string} name a description of what you are requesting
* @param {string} link a description of what you are requesting
* @return {string} a 200 OK is returned
*/
// https://us-central1-swarmcity-23c70.cloudfunctions.net/addHashtag?hashtag_name=pioneer&last_deal=1503397878&deals=0&description=This is a description&maintainer=this hash tag is maintained by Swarm City&name=twitter&link=http://www.twitter.com
exports.addHashtag = functions.https.onRequest((req, res) => {
    const hashtag_id = uuidv4();
    let ipfs_hash = 'awaiting hash';
    const data = {
        contacts: {
            name: req.query.name,
            link: req.query.link,
        },
        deals: req.query.deals,
        description: req.query.description,
        hashtag_id: hashtag_id,
        hashtag_name: req.query.hashtag_name,
        ipfs_hash: ipfs_hash,
        last_deal: req.query.last_deal,
        maintainer: req.query.maintainer,
    }
    admin.database().ref('/hashtags').push(data)
    .then(snapshot => {
        ipfs_hash = data2Hash(data);
        return snapshot.ref.toString().split("/")[4];
    })
    .then(data1 => {
        admin.database().ref('/hashtags/'+data1).update({ipfs_hash:ipfs_hash});
        res.status(200).send('OK');
    });
});

/**
* @param {string} budget a budget you are willing to pay for for your request
* @param {string} lookingFor a description of what you are requesting
* @param {string} location a geohash
* @param {string} hashtagId the promary key from a hashtag
* TODO: We need to check this hashtagId exists
* @return {string} a 200 OK is returned
*/
// https://us-central1-swarmcity-23c70.cloudfunctions.net/addRequest?budget=150&lookingFor=A%20Place%20To%20Stay&location=k3lj45&hashtagId=20349
exports.addRequest = functions.https.onRequest((req, res) => {
    const request_id = uuidv4();
    let ipfs_hash = 'awaiting hash';
    const data = {
        looking_for: req.query.lookingFor,
        budget: req.query.budget,
        location: req.query.location,
        hashtag_id: req.query.hashtagId,
    }
    admin.database().ref('/requests').push(data)
    .then(snapshot => {
        ipfs_hash = data2Hash(data);
        return snapshot.ref.toString().split("/")[4];
    })
    .then(data1 => {
        admin.database().ref('/requests/'+data1).update({ipfs_hash:ipfs_hash});
        res.status(200).send('OK');
    });
})

/**
* @param {string} offer a budget you are willing to offer for for the request
* @param {string} requestId the promary key from a request
* TODO: We need to check this requestId exists
* @param {string} reply a description of the reply to an offer
* @return {string} a 200 OK is returned
*/
// https://us-central1-swarmcity-23c70.cloudfunctions.net/addReply?offer=150&reply=A%20Place%20To%20Stay&requestId=k3lj45&hashtagId=20349
exports.addReply = functions.https.onRequest((req, res) => {
    const reply_id = uuidv4();
    let ipfs_hash = 'awaiting hash';
    const data = {
        request_id: req.query.requestId,
        offer: req.query.offer,
        reply: req.query.reply,
    }
    admin.database().ref('/replies').push(data)
    .then(snapshot => {
        ipfs_hash = data2Hash(data);
        return snapshot.ref.toString().split("/")[4];
    })
    .then(data1 => {
        admin.database().ref('/replies/'+data1).update({ipfs_hash:ipfs_hash});
        res.status(200).send('OK');
    });
})

exports.getUserbalances = functions.database.ref('/connected/{publickey}')
    .onWrite(event => {
      const original = event.data.val();
      //console.log('Uppercasing', event.params.publickey, original);
      var livebalances = getBalances(event.params.publickey).then(function(livebalances){
        console.log(livebalances);
        // Livebalances = {swt: values[0], arc: values[1], eth:values[2]};
        admin.database().ref('/usercache/'+event.params.publickey).set(livebalances);
      });
});


function data2Hash(data) {
    // GET IPFS HASH FOR DATA HERE
    return 'AmV1G4EzLq9AMvrw7f9kdjzdPsGefyjrCp6hnP7urWa8EX'
}

function getBalances(pubkey) {

  var web3 = new Web3();

  web3.setProvider(new web3.providers.HttpProvider('https://ethpool.swarm.city'));

  //console.log(web3, web3.eth);
  // Get the current SWT and ETH balances

  var promise_swt = new Promise((resolve, reject) => {

    var swtminime = web3.eth.contract(minime.abi);
    var swtminimeInstance = swtminime.at("0xb9e7f8568e08d5659f5d29c4997173d84cdf2607");

    swtminimeInstance.balanceOf(pubkey, function(err, res) {
      if (!err) {
        //console.log('swt: ', res.toNumber(10));
        resolve(res.toNumber(10));
      }
    });
  });

  var promise_arc = new Promise((resolve, reject) => {

    var arcminime = web3.eth.contract(minime.abi);
    var arcminimeInstance = arcminime.at("0xAc709FcB44a43c35F0DA4e3163b117A17F3770f5");

    arcminimeInstance.balanceOf(pubkey, function(err, res) {
      if (!err) {
        resolve(res.toNumber(10));
      }
    });
  });

  var promise_eth = new Promise((resolve, reject) => {
    web3.eth.getBalance(pubkey, function(err, res) {
      resolve(res.toNumber(10));
    });
  });

  return new Promise((resolve, reject) => {
    Promise.all([promise_swt, promise_arc, promise_eth]).then(values => {
      resolve({swt: values[0], arc: values[1], eth:values[2]});
    });
  });

}
