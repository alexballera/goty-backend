import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-grafica-c4e2e.firebaseio.com"
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.json({
     mensaje: "Hello mundo desde Funciones de Firebase!!!"
 });
});

export const getGOTY = functions.https.onRequest( async(request, response) => {
    // const nombre = request.query.nombre || 'Sin nombre'

    // response.json({
    //     nombre
    // })

    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();

    const juegos = docsSnap.docs.map(doc => doc.data())

    response.json(juegos)
});
