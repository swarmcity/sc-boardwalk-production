const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');
admin.initializeApp(functions.config().firebase);

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


function data2Hash(data) {
    // GET IPFS HASH FOR DATA HERE
    return 'QmV8G4EzLq9AMvrw7f9kdjzdPsGefyjrCp6hnP7urWa8ED'
};