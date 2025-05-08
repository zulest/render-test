import * as admin from 'firebase-admin';
const serviceAccount = require("./service-account-key.json");


// Configura Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const firestore = admin.firestore();