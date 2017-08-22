const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// https://us-central1-swarmcity-23c70.cloudfunctions.net/addHashtag?hashtag_name=pioneer&hashtag_id=1&location=ew234e&deals=0&description=This is a description&maintainer=theKing&name=twitter&link=http://www.twitter.com
exports.addHashtag = functions.https.onRequest((req, res) => { 
    let ipfs_hash = '';
    const data = {
        contacts: {
            name: req.query.name,
            link: req.query.link,
        },
        deals: req.query.deals,
        description: req.query.description,
        hashtag_id: req.query.hashtag_id,
        hashtag_name: req.query.hashtag_name,
        ipfs_hash:0,
        location: req.query.location,
        maintainer: req.query.maintainer,
    }
    admin.database().ref('/hashtags').push(data)
    .then(snapshot => {
        ipfs_hash = data2Hash(data);
        return snapshot.ref.toString().split("/")[4]; 
    })
    .then(data1 => {
        admin.database().ref('/hashtags/'+data1).update({ipfs_hash:ipfs_hash})
    });
});


function data2Hash(data) {
    // GET IPFS HASH FOR DATA HERE
    return 'aaaaa1aaaa'
};