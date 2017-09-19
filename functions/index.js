const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');
const ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI({
              host: 'ipfsapi.swarm.city',
              protocol: 'https',
              port : 443
            });

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
        return snapshot.ref.toString().split("/")[4]; 
    })
    .then(data1 => {
        // TODO for the will : convert this to a promise.
        data2Hash(data).then( ipfs_hash => {
            admin.database().ref('/hashtags/'+data1).update({ipfs_hash:ipfs_hash});
            res.status(200).send('OK');
        });
    });
});


function data2Hash(data,cb) {
        var bufferdata = new Buffer(JSON.stringify(data);
        return new Promise((resolve, reject) => {
            ipfs.add(bufferdata, function(err, res) {
                if (err){
                    return reject();
                }
                return resolve(res);
            });
        });

    // GET IPFS HASH FOR DATA HERE
    //return 'QmV8G4EzLq9AMvrw7f9kdjzdPsGefyjrCp6hnP7urWa8ED'
};