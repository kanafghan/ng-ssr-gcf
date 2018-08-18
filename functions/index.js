const functions = require('firebase-functions');
const ssr = require('./ssr');

exports.ssr = functions.https.onRequest(ssr.app);
