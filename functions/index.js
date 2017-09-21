const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');
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
    let ipfs_hash = 'awaiting hash';
    const data = {
        contacts: {
            name: req.query.name,
            link: req.query.link,
        },
        deals: req.query.deals,
        description: req.query.description,
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

function data2Hash(data) {
    // GET IPFS HASH FOR DATA HERE
    return 'AmV1G4EzLq9AMvrw7f9kdjzdPsGefyjrCp6hnP7urWa8EX'
};


