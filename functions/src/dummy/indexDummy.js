// const functions = require("firebase-functions/v1");
// const { cert } = require("firebase-admin/app");
// const admin = require("firebase-admin");
// const serviceAccount = require("../credentials.json");

// admin.initializeApp({
//   credential: cert(serviceAccount),
// });

// exports.setData = functions.https.onRequest(async (req, res) => {
//   const db = getFirestore();

//   const docRef = await db.collection("users").doc("alovelace");

//   await docRef.set({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   });

//   const aTuringRef = db.collection("users").doc("aturing");

//   await aTuringRef.set({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912,
//   });

//   res.status(200).send("Datos guardados satisfactoriamente!");
// });

// exports.getData = functions.https.onRequest(async (req, res) => {
//   const db = getFirestore();

//   const snapshot = await db.collection("users").get();

//   if (snapshot.length === 0) {
//     res.status(200).json({ message: "BBDD encontrada pero sin datos" });
//   }

//   snapshot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data());
//   });

//   res.status(200).json({ message: "Al fin se enontraron datos!!" });
// });

console.log("Servidor dummy");
