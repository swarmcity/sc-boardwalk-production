const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.addHashtag = functions.https.onRequest((req, res) => { 
    const data = {
        hashtag_name: req.query.hashtag_name,
        hashtag_id: req.query.hashtag_id,
        location: req.query.location,
        deals: req.query.deals,
        description: req.query.description,
        maintainer: req.query.maintainer,
        contacts: {
            name: req.query.name,
            link: req.query.link
        }
    }
    admin.database().ref('/hashtags').push(data)
    .then(snapshot => {
    res.redirect(303, snapshot.ref);
    });
});

