const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.demo = functions.https.onRequest((req, res) => {
  const db = admin.database();
  db.ref('meta_bottles').once('value').then(console.log).catch(console.error);
  res.send({ 'req_path': req.path });
});

const ssr = require('./ssr');
exports.ssr = functions.https.onRequest(ssr.app);
